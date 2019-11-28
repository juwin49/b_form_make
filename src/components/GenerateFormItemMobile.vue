<template>
  <div id="GFM">
    <template v-if="widget.type == 'input'" >

    <div  :class="widget.options.customClass">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
        <van-field
          :type="widget.options.dataType"
          v-model.number="dataModel"
          :placeholder="widget.options.placeholder"
          :disabled="widget.options.disabled"
        />
    </div>

    </template>

    <template v-if="widget.type == 'textarea'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
        <van-field type="textarea"
          :rows="5"
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder ? widget.options.placeholder : '输入文本'"
        />
    </template>

    <template v-if="widget.type == 'number'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
        <van-stepper
          v-model="dataModel"
          controls-position="right"
          :min=0
          :step="widget.options.step"
          :disabled="widget.options.disabled"
        />
      </div>
    </template>

    <template v-if="widget.type == 'radio'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
        <van-radio-group v-model="dataModel"
          :disabled="widget.options.disabled"
        >
          <van-radio class="vradio"
             v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"  :key="index" :name="item.value">
            <template v-if="widget.options.remote">{{item.label}}</template>
            <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
          </van-radio>
        </van-radio-group>
      </div>
    </template>

    <template v-if="widget.type == 'checkbox'" >
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
        <van-checkbox-group v-model="dataModel"
          :disabled="widget.options.disabled"
        >
          <van-checkbox class="vcheckbox"
             v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"  :key="index" :name="item.value" shape="square">
            <template v-if="widget.options.remote">{{item.label}}</template>
            <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </template>

    <template v-if="widget.type == 'time'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <van-field
             readonly
             clickable
            label="时间"
            :value="value"
            placeholder="选择时间"
            @click="showP = true"
        />

        <van-popup v-model="showP" position="bottom" >
            <van-datetime-picker
                  v-model="dataModel"
                  type="time"
                  :min-hour="0"
                  :max-hour="23"
                  @cancel="showP = false"
                  @confirm="onConfirmTime"
             />
        </van-popup>
    </template>

    <template v-if="widget.type=='date'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <van-field
             readonly
             clickable
            label="日期"
            :value="date"
            placeholder="选择日期"
            @click="showP = true"
        />
        <van-popup v-model="showP" position="bottom" >
            <van-datetime-picker
                  v-model="dataModel"
                  type="date"
                  :formatter="formatter"
                  @cancel="showP = false"
                  @confirm="onConfirmDate"
             />
        </van-popup>
    </template>

    <template v-if="widget.type =='rate'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
      <van-rate v-model="dataModel"
        :count="widget.options.max"
        :disabled="widget.options.disabled"
        :allow-half="widget.options.allowHalf"
      />
      </div>
    </template>

    <template v-if="widget.type == 'color'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <colorPicker v-model="color"  />
    </template>

    <template v-if="widget.type == 'select'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <van-dropdown-menu   >
         <van-dropdown-item  v-model="dataModel"  :options="(widget.options.remote ? widget.options.remoteOptions : widget.options.options)" @open="openSelect" />
         <!-- <van-switch-cell v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value" /> -->
      </van-dropdown-menu>
    </template>

    <template v-if="widget.type=='switch'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
        <van-switch
          v-model="dataModel"
          :disabled="widget.options.disabled"
        >
        </van-switch>
      </div>
    </template>

    <template v-if="widget.type=='slider'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
      <van-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :value="widget.options.showInput"
        :step="widget.options.step"
      ></van-slider>
      </div>
    </template>

    <template v-if="widget.type=='fileupload'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
        <van-uploader :after-read="afterReadFile"  >
            <van-button v-model="dataModel" icon="orders-o" type="primary">上传文件</van-button>
        </van-uploader>
      </div>
    </template>

    <template v-if="widget.type=='imgupload'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
        <van-uploader v-model="dataModel" :multiple="widget.options.multiple"  />
      </div>
    </template>

    <template v-if="widget.type == 'editor'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
      <vue-editor
        v-model="dataModel"
        :style="{width: widget.options.width}"
      >
      </vue-editor>
      </div>
    </template>

    <template v-if="widget.type == 'cascader'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
      <van-tree-select
         v-model="dataModel"
        :items="widget.options.remoteOptions"
        :disabled="widget.options.disabled"
        :main-active-index.sync="activeIndex"
        :active-id.sync="activeId"
        @click-nav="selectNav"
      />
    </div>
    </template>

    <template v-if="widget.type == 'text'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
        <span >{{dataModel}}</span>
      </div>
    </template>

    <template v-if="widget.type == 'divider'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <van-divider  />
    </template>

    <template v-if="widget.type == 'tabs'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <div class="GFMbox">
        <van-tabs v-model="dataModel" >
          <van-tab  v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.tabs)" :key="index" :title="item.label">{{item.list}}</van-tab>
        </van-tabs>
      </div>
    </template>

    <template v-if="widget.type == 'numberkeyboard'">
      <h2 class="van-doc-title">{{widget.name}} ：</h2>
      <van-field
           clickable
           :value="value"
           @touchstart.native.stop="showP = true"
           @input="inputField"

        />
       <van-number-keyboard
           v-model="value"
          :show="showP"
          :maxlength="6"
          @blur="showP = false"
        />
    </template>

  </div>
</template>

<script>
//import FmUpload from './Upload'
import { VueEditor } from "vue2-editor"
import colorPicker from './colorPicker'


export default {
  props: ['widget', 'models', 'rules', 'remote'],
  components: {
  //  FmUpload,
    VueEditor,colorPicker
  },
  data () {
    return {
      dataModel: this.models[this.widget.model],
      showP:false,
      value:this.widget.vantinit,
      activeId: 1,
      activeIndex:0,
      selectDefaul:0,
      date:'',
      color: '#ff0000'
    }
  },
  created () {
    if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
      this.remote[this.widget.options.remoteFunc]((data) => {
        this.widget.options.remoteOptions = data.map(item => {
          return {
            value: item[this.widget.options.props.value],
            text: item[this.widget.options.props.label],
            children: item[this.widget.options.props.children]
          }
        })
      })
    }
    if (this.widget.type === 'imgupload' && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }
  },
  methods: {

    onConfirmTime(value){
      this.value = value;
      this.showP = false;
      console.log(value);
    },
    formatter(type, value) {
          if (type === 'year') {
                return `${value}年`;
          } else if (type === 'month') {
                return `${value}月`
          }else if(type === 'day'){
                return `${value}日`
          }
                return value;
    },
    onConfirmDate(value){
      let  d = value;
      this.date = d.getFullYear() + "年"+ (d.getMonth() + 1) +"月"+ d.getDate() +"日";
      this.showP = false;

    },
    // onSliderChange(value){
    //   this.$toast('当前值：' + value);
    // },
    openSelect(){
    },
    inputField(){
      console.log(this.widget,this.models,this.dataModel);
    },
    selectNav(){
      console.log(this.widget.options,this.widget.options.remoteOptions[0].children);
    },
    afterReadFile(file){
      console.log(file);
    }
  },
  watch: {
    dataModel: {
      deep: true,
      handler (val) {
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
        this.$emit('input-change', val, this.widget.model)
      }
    },
    models: {
      deep: true,
      handler (val) {
        this.dataModel = val[this.widget.model]
      }
    }
  }
}
</script>
<style lang="scss"  rel="stylesheet/scss">
body{
  background-color: #f4f3f6;
  #GFM{
    width: 90%;
    margin: 15px auto;
    // background-color: rgba(236, 245, 255, 0.3);
    background-color: transparent;

    .GFMbox{
      background-color: #fff;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 3px 6px #ebedf0;
    }
    .van-cell {
      border-radius: 4px;
      box-shadow: 0 3px 6px #ebedf0;
    }
    .input-opacity{
      .van-cell{
        opacity: 0.3;
        border-radius: 50px;
        font-size: 17px;
        font-weight: bold;
      }
    }
    .van-doc-title{
      margin: 0;
      padding: 5px 15px 15px 0;
      color: rgba(69, 90, 100, 0.7);
      font-weight: normal;
      font-size: 14px;
    }
    .box{
      .van-cell{
        font-size: 17px;
        font-weight: bold;
      }
    }
    .vcheckbox,.vradio{
        margin: 10px 0 0 20px;
      }
    .van-dropdown-item {
      width: 90%;
      margin: 0 auto;
    }
    .van-dropdown-menu__title{
      position: inherit;
      padding: 0 20px;
    }
    .van-dropdown-menu__title::after {
       right:20px;
    }
    .van-radio__icon--checked .van-icon,.van-checkbox__icon--checked .van-icon {
      background-color: #2cd079;
      border-color: #2cd079;
    }

    .van-slider__bar ,.van-switch--on {
       background-color: #2cd079;
    }
    .van-tree-select__nav-item--active {
       border-color: #2cd079;
    }
    .van-dropdown-menu__title--active ,.van-dropdown-item__option--active, .van-dropdown-item__option--active .van-dropdown-item__icon,.van-tree-select__item--active ,.van-picker__cancel, .van-picker__confirm{
      color: #2cd079;
    }
  }
}


</style>

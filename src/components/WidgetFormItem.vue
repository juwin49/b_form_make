<template>
  <!-- 大配置  data.config  -->
  <!-- 小配置  element.options  -->

  <div class='manage_form_item'>
    <el-form-item class="widget-view " v-if="element && element.key"
    :class="{
      active: selectWidget.key == element.key,
      'is_req': element.options.required,
      'empty_name':element.options.textAlign,
    }"
    :style="{
      paddingBottom: data.config.paddingBottom + 'px',
    }"
    @click.native.stop="handleSelectWidget(index)"
    >
      <!--标题-->
      <!-- <div
      :class="{
        element_name: true,
        fl: data.config.labelPosition!='top'
      }"
      :style="{
        width: data.config.labelPosition!='top'? data.config.labelWidth+'px' : 'auto',
        textAlign: data.config.labelPosition!='top'? data.config.labelPosition: 'left',
        paddingLeft: data.config.labelPosition=='top'? data.config.labelLeft+'px': 0,
        fontSize: data.config.labelFontSize+'px',
        fontWeight: data.config.labelFontWeight?'bolder':'normal',
      }"
      >{{element.name}}<span v-if='element.name'>：</span></div> -->

      <!--标题右边-->
      <!-- <div
      class = "element_other"
     :style="{
        paddingLeft: data.config.labelPosition!='top'? data.config.labelWidth+'px': data.config.inputLeft+'px',
        paddingRight: data.config.inputRight+'px'
      }"
      > -->
      <div class = "element_other"  v-drag>


          <!--文字-->

          <template v-if="element.type == 'text'" >
            <div
              :style="{
              textAlign: element.options.textAlign,
              lineHeight: element.options.lineHeight+'px',
              }"
            >{{element.options.defaultValue}}</div>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--图片-->
          <template v-if="element.type=='imgupload'" >
            <fm-upload
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :style="{'width': element.options.width}"
              :width="element.options.size.width"
              :height="element.options.size.height"
              token="xxx"
              domain="xxx"
            >
            </fm-upload>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--单行文本-->
          <template v-if="element.type == 'input'">
            <el-input :class='element.class'
              v-model="element.options.defaultValue"
              :style="{width: element.options.width, height: element.options.height}"
              :placeholder="element.options.placeholder"
              :disabled="element.options.disabled"
            ></el-input>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--多行文本-->
          <template v-if="element.type == 'textarea'">
            <el-input type="textarea" :rows="5"
              v-model="element.options.defaultValue"
              :style="{width: element.options.width}"
              :disabled="element.options.disabled"
              :placeholder="element.options.placeholder"
            ></el-input>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--计数器-->
          <template v-if="element.type == 'number'">
            <el-input-number
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :controls-position="element.options.controlsPosition"
              :style="{width: element.options.width}"
            ></el-input-number>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>


          <!--单选框组-->
          <template v-if="element.type == 'radio'">
            <el-radio-group v-model="element.options.defaultValue" :style="{width: element.options.width}" :disabled="element.options.disabled">
              <el-radio :style="{display: element.options.inline ? 'inline-block' : 'block'}" :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index">
                {{element.options.showLabel ? item.label : item.value}}
              </el-radio>
            </el-radio-group>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--多选框组-->
          <template v-if="element.type == 'checkbox'">
            <el-checkbox-group v-model="element.options.defaultValue" :style="{width: element.options.width}" :disabled="element.options.disabled">
              <el-checkbox :style="{display: element.options.inline ? 'inline-block' : 'block'}" :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index">
                {{element.options.showLabel ? item.label : item.value}}
              </el-checkbox>
            </el-checkbox-group>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--时间选择器-->
          <template v-if="element.type == 'time'">
            <el-time-picker
              v-model="element.options.defaultValue"
              :is-range="element.options.isRange"
              :placeholder="element.options.placeholder"
              :start-placeholder="element.options.startPlaceholder"
              :end-placeholder="element.options.endPlaceholder"
              :readonly="element.options.readonly"
              :disabled="element.options.disabled"
              :editable="element.options.editable"
              :clearable="element.options.clearable"
              :arrowControl="element.options.arrowControl"
              :style="{width: element.options.width}"
            >
            </el-time-picker>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--日期选择器-->
          <template v-if="element.type == 'date'">
            <el-date-picker
              v-model="element.options.defaultValue"
              :type="element.options.type"
              :is-range="element.options.isRange"
              :placeholder="element.options.placeholder"
              :start-placeholder="element.options.startPlaceholder"
              :end-placeholder="element.options.endPlaceholder"
              :readonly="element.options.readonly"
              :disabled="element.options.disabled"
              :editable="element.options.editable"
              :clearable="element.options.clearable"
              :style="{width: element.options.width}"
            >
            </el-date-picker>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--评分-->
          <template v-if="element.type == 'rate'">
            <el-rate v-model="element.options.defaultValue"
              :max="element.options.max"
              :disabled="element.options.disabled"
              :allow-half="element.options.allowHalf"
            ></el-rate>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--颜色选择器-->
          <template v-if="element.type == 'color'">
            <el-color-picker
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :show-alpha="element.options.showAlpha"
            ></el-color-picker>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--下拉选择框-->
          <template v-if="element.type == 'select'">
            <el-select
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :multiple="element.options.multiple"
              :clearable="element.options.clearable"
              :placeholder="element.options.placeholder"
              :style="{width: element.options.width}"
            >
              <el-option v-for="item in element.options.options" :key="item.value" :value="item.value" :label="element.options.showLabel?item.label:item.value"></el-option>
            </el-select>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--开关-->
          <template v-if="element.type=='switch'">
            <el-switch v-model="element.options.defaultValue" :disabled="element.options.disabled">
            </el-switch>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--滑块-->
          <template v-if="element.type=='slider'">
            <el-slider
              v-model="element.options.defaultValue"
              :min="element.options.min"
              :max="element.options.max"
              :disabled="element.options.disabled"
              :step="element.options.step"
              :show-input="element.options.showInput"
              :range="element.options.range"
              :style="{width: element.options.width}"
            ></el-slider>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--级联选择器-->
          <template v-if="element.type == 'cascader'">
            <el-cascader
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :clearable="element.options.clearable"
              :placeholder="element.options.placeholder"
              :style="{width: element.options.width}"
              :options="element.options.remoteOptions"
            >

            </el-cascader>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--编辑器-->
          <template v-if="element.type == 'editor'">
            <vue-editor
              v-model="element.options.defaultValue"
              :style="{width: element.options.width}"
            >
            </vue-editor>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>

          <!--自定义区域-->
          <template v-if="element.type=='blank'">
            <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">自定义区域</div>
            <i class="none_eye icon iconfont icon-time" :style="{display: element.options.display==true?'block':'none'}"></i>
          </template>


         <!--复制及删除-->
          <div class="widget-view-action" v-if="selectWidget.key == element.key">
            <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
            <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
          </div>


          <!-- <div class="widget-view-drag" v-if="selectWidget.key == element.key">
            <i class="iconfont icon-drag drag-widget"></i>
          </div> -->

      </div>
    </el-form-item>
  </div>
</template>

<script>
import FmUpload from './Upload'
import { VueEditor } from "vue2-editor"

export default {
  props: ['element', 'select', 'index', 'data', 'item'],
  components: {
    FmUpload,
    VueEditor,
  },
  data () {
    return {
      selectWidget: this.select,
      // positionX:0,
      // positionY:0
    }
  },
  mounted () {
    console.log(this.element,this.element.key,55)
  },
  methods: {
    //中心区域点击某个元素时执行
    handleSelectWidget (index) {
      this.selectWidget = this.item.list[index]
    },
    //点击删除
    handleWidgetDelete (index) {
      if (this.item.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.item.list[index - 1]
        }
      } else {
        this.selectWidget = this.item.list[index + 1]
      }

      this.$nextTick(() => {
        this.item.list.splice(index, 1)
      })
    },
    //点击复制
    handleWidgetClone (index) {
      let cloneData = {
        ...this.item.list[index],
        options: {...this.item.list[index].options},
        key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      }

      if (this.item.list[index].type === 'radio' || this.item.list[index].type === 'checkbox') {

        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({...item}))
          }
        }
      }

      this.item.list.splice(index, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.item.list[index + 1]
      })
    },
  },
  directives: {
     drag: {
         // 指令的定义
         bind: function (el) {
             let odiv = el;   //获取当前元素
             odiv.onmousedown = (e) => {
                 //算出鼠标相对元素的位置
                 let disX = e.clientX - odiv.offsetLeft;
                 let disY = e.clientY - odiv.offsetTop;

                 document.onmousemove = (e)=>{

                     //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                     let left = e.clientX - disX;
                     let top = e.clientY - disY;
                      console.log(left,top,666666)

                     //绑定元素位置到positionX和positionY上面
                    // this.positionX = top;
                     //this.positionY = left;

                     //移动当前元素
                     odiv.style.left = left + 'px';
                     odiv.style.top = top + 'px';
                 };
                 document.onmouseup = (e) => {
                     document.onmousemove = null;
                     document.onmouseup = null;
                 };
             };
         }
     }
 },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
.element_other{
  position: absolute;
  left: 0;
  top: 0;
   width: 200px;
   height: 120px;
   border: 1px solid #eee;
}


</style>

<template>
  <!-- 大配置  data.config -->
  <!-- 小配置  widget.options -->

  <div class='client_form_item'>
    <el-form-item 
      :prop="widget.model"
      :class="{
        'empty_name':widget.options.textAlign&&data.config.labelPosition!='top',
        'empty_pl':widget.options.textAlign&&data.config.labelPosition=='top',
      }"
      :style="{
        display: widget.options.display==true?'none':'block',
        paddingBottom: data.config.paddingBottom*2 + 'px',
      }"
    >
      <!--标题-->
      <div
      :class="{
        element_name: true,
        fl: data.config.labelPosition!='top'
      }"
      :style="{
        width: data.config.labelPosition!='top'? data.config.labelWidth+'px': 'auto',
        textAlign: data.config.labelPosition!='top'? data.config.labelPosition: 'left',
        paddingLeft: data.config.labelPosition=='top'? data.config.labelLeft+'px': 0,
        fontSize: data.config.labelFontSize+'px',
        fontWeight: data.config.labelFontWeight?'bolder':'normal',
      }"
      >{{widget.name}}<span v-if='widget.name'>：</span></div>

      <!--标题右边-->
      <div
      :style="{
        paddingLeft: data.config.labelPosition!='top'? data.config.labelWidth+'px': data.config.inputLeft+'px',
        paddingRight: data.config.inputRight+'px'
      }"
      >

        <!--单行文本-->
        <template v-if="widget.type == 'input'" >
          <el-input :class='widget.class'
            v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
            :type="widget.options.dataType"
            v-model.number="dataModel"
            :placeholder="widget.options.placeholder"
            :style="{width: widget.options.width}"
            :disabled="widget.options.disabled"
          ></el-input>

          <el-input 
            v-else
            :type="widget.options.dataType"
            v-model="dataModel"
            :disabled="widget.options.disabled"
            :placeholder="widget.options.placeholder"
            :style="{width: widget.options.width}"
          ></el-input>
        </template>

        <!--多行文本-->
        <template v-if="widget.type == 'textarea'">
          <el-input type="textarea" :rows="5"
            v-model="dataModel"
            :disabled="widget.options.disabled"
            :placeholder="widget.options.placeholder"
            :style="{width: widget.options.width}"
          ></el-input>
        </template>

        <!--计数器-->
        <template v-if="widget.type == 'number'">
          <el-input-number 
            v-model="dataModel" 
            :style="{width: widget.options.width}"
            :step="widget.options.step"
            controls-position="right"
            :disabled="widget.options.disabled"
          ></el-input-number>
        </template>

        <!--单选框组-->
        <template v-if="widget.type == 'radio'">
          <el-radio-group v-model="dataModel"
            :style="{width: widget.options.width}"
            :disabled="widget.options.disabled"
          >
            <el-radio
              :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
              :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index"
            >
              <template v-if="widget.options.remote">{{item.label}}</template>
              <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
            </el-radio>
          </el-radio-group>
        </template>

        <!--多选框组-->
        <template v-if="widget.type == 'checkbox'">
          <el-checkbox-group v-model="dataModel"
            :style="{width: widget.options.width}"
            :disabled="widget.options.disabled"
          >
            <el-checkbox
              
              :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
              :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index"
            >
              <template v-if="widget.options.remote">{{item.label}}</template>
              <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
            </el-checkbox>
          </el-checkbox-group>
        </template>

        <!--时间选择器-->
        <template v-if="widget.type == 'time'">
          <el-time-picker 
            v-model="dataModel"
            :is-range="widget.options.isRange"
            :placeholder="widget.options.placeholder"
            :start-placeholder="widget.options.startPlaceholder"
            :end-placeholder="widget.options.endPlaceholder"
            :readonly="widget.options.readonly"
            :disabled="widget.options.disabled"
            :editable="widget.options.editable"
            :clearable="widget.options.clearable"
            :arrowControl="widget.options.arrowControl"
            :value-format="widget.options.format"
            :style="{width: widget.options.width}"
          >
          </el-time-picker>
        </template>

        <!--日期选择器-->
        <template v-if="widget.type=='date'">
          <el-date-picker
            v-model="dataModel"
            :type="widget.options.type"
            :placeholder="widget.options.placeholder"
            :start-placeholder="widget.options.startPlaceholder"
            :end-placeholder="widget.options.endPlaceholder"
            :readonly="widget.options.readonly"
            :disabled="widget.options.disabled"
            :editable="widget.options.editable"
            :clearable="widget.options.clearable"
            :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
            :format="widget.options.format"
            :style="{width: widget.options.width}"
          >
          </el-date-picker>
        </template>

        <!--评分-->
        <template v-if="widget.type =='rate'">
          <el-rate v-model="dataModel"
            :max="widget.options.max"
            :disabled="widget.options.disabled"
            :allow-half="widget.options.allowHalf"
          ></el-rate>
        </template>

        <!--颜色选择器-->
        <template v-if="widget.type == 'color'">
          <el-color-picker 
            v-model="dataModel"
            :disabled="widget.options.disabled"
            :show-alpha="widget.options.showAlpha"
          ></el-color-picker>
        </template>

        <!--下拉选择框-->
        <template v-if="widget.type == 'select'">
          <el-select
            v-model="dataModel"
            :disabled="widget.options.disabled"
            :multiple="widget.options.multiple"
            :clearable="widget.options.clearable"
            :placeholder="widget.options.placeholder"
            :style="{width: widget.options.width}"
            :filterable="widget.options.filterable"
          >
            <el-option v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option>
          </el-select>
        </template>

        <!--开关-->
        <template v-if="widget.type=='switch'">
          <el-switch
            v-model="dataModel"
            :disabled="widget.options.disabled"
          >
          </el-switch>
        </template>

        <!--滑块-->
        <template v-if="widget.type=='slider'">
          <el-slider 
            v-model="dataModel"
            :min="widget.options.min"
            :max="widget.options.max"
            :disabled="widget.options.disabled"
            :step="widget.options.step"
            :show-input="widget.options.showInput"
            :range="widget.options.range"
            :style="{width: widget.options.width}"
          ></el-slider>
        </template>

        <!--文字-->
        <template v-if="widget.type == 'text'">
          <div
            :style="{
            textAlign: widget.options.textAlign,
            lineHeight: widget.options.lineHeight+'px',
            }"
          >
            {{dataModel}}
          </div>
        </template>

        <!--图片-->
        <template v-if="widget.type=='imgupload'">
          <fm-upload
            v-model="dataModel"
            :disabled="widget.options.disabled"
            :style="{'width': widget.options.width}"
            :width="widget.options.size.width"
            :height="widget.options.size.height"
            :token="widget.options.token"
            :domain="widget.options.domain"
            :multiple="widget.options.multiple"
            :length="widget.options.length"
            :is-qiniu="widget.options.isQiniu"
            :is-delete="widget.options.isDelete"
            :min="widget.options.min"
            :is-edit="widget.options.isEdit"
            :action="widget.options.action"
          >
          </fm-upload>
        </template>

        <!--编辑器-->
        <template v-if="widget.type == 'editor'">
          <vue-editor
            v-model="dataModel"
            :style="{width: widget.options.width}"
          >
          </vue-editor>
        </template>

        <!--级联选择器-->
        <template v-if="widget.type == 'cascader'">
          <el-cascader
            v-model="dataModel"
            :disabled="widget.options.disabled"
            :clearable="widget.options.clearable"
            :placeholder="widget.options.placeholder"
            :style="{width: widget.options.width}"
            :options="widget.options.remoteOptions"
          >
          </el-cascader>
        </template>

        <!--成员单选-->
        <template v-if="widget.type == 'memberRadio'" >
          <div class='ps_select' @click='sel_memberRadio()'>点击选择成员</div>
        </template>

        
      </div>
    </el-form-item>

    <!--弹出生成JSON框-->
    <member-dialog
      title = '成员列表'
      :visible="memberVisible"
      @on-close="memberVisible = false"
      ref="memberVisible"
      width="800px"
      form
    >

      <div id="memberVisible">
        <div></div>
      </div>

      <template slot="action">
        <el-button type="primary" class="json-btn" >复制数据</el-button>
      </template>
    </member-dialog>
  </div>
</template>

<script>
import FmUpload from './Upload'
import { VueEditor } from "vue2-editor"
import MemberDialog from './MemberDialog'

export default {
  props: ['widget', 'models', 'rules', 'data', 'remote'],
  components: {
    FmUpload,
    MemberDialog,
  },
  data () {
    return {
      dataModel: this.models[this.widget.model],
      memberVisible: false,
    }
  },
  created () {
    if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
      this.remote[this.widget.options.remoteFunc]((data) => {
        this.widget.options.remoteOptions = data.map(item => {
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
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
    //显示选择成员框
    sel_memberRadio () {
      this.memberVisible = true
      console.log(111)
    },
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

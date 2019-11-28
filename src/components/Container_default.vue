<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <!--左边区域(没做调用)-->
        <el-aside width="250px">
          <div class="components-list">
            <template v-if="basicFields.length">
              <div class="widget-cate">基础字段</div>
              <!--列出基础字段-->
              <draggable tag="ul" :list="basicComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >

                <li v-if="basicFields.indexOf(item.type)>=0" class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}" v-for="(item, index) in basicComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>

            <template v-if="advanceFields.length">
              <div class="widget-cate">高级字段</div>
              <!--列出高级字段-->
              <draggable tag="ul" :list="advanceComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >

                <li v-if="advanceFields.indexOf(item.type) >= 0" class="form-edit-widget-label" :class="{'no-put': item.type == 'table'}" v-for="(item, index) in advanceComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>


            <template v-if="layoutFields.length">
              <div class="widget-cate">布局字段</div>
              <!--列出布局字段-->
              <draggable tag="ul" :list="layoutComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >

                <li v-if="layoutFields.indexOf(item.type) >=0" class="form-edit-widget-label no-put" v-for="(item, index) in layoutComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>

          </div>

        </el-aside>

        <!--显示中心区域(有调用)-->
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action">
            </slot>
            <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">导入JSON</el-button>
            <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空</el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePhonePreview">手机端预览</el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePCPreview">PC端预览</el-button>
            <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
            <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button>
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
            <widget-form v-if="!resetJson"  ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
          </el-main>
        </el-container>

        <!--显示右边1和2区域(有调用)-->
        <el-aside class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
              <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
            </el-header>
            <el-main class="config-content">
              <widget-config v-show="configTab=='widget'" :data="widgetFormSelect"></widget-config>
              <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
            </el-main>
          </el-container>
        </el-aside>

        <!--弹出PC端预览框-->
        <cus-dialog
          :visible="previewPCVisible"
          @on-close="previewPCVisible = false"
          ref="widgetPreview"
          width="1000px"
          form
        >
          <generate-form insite="true" @on-change="handleDataChange" v-if="previewPCVisible" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs" ref="generateForm">

            <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
          </generate-form>

          <template slot="action">
            <el-button type="primary" @click="handleTest">获取数据</el-button>
            <el-button @click="handleReset">重置</el-button>
          </template>
        </cus-dialog>



        <!--弹出手机端预览框-->
        <cus-dialog
          :visible="previewPhoneVisible"
          @on-close="previewPhoneVisible = false"
          ref="widgetPreview"
          width="1000px"
          form
        >
        <div class="mobile-preview">
          <img src="../../src/assets/iphone_for_preview.png">
        <div class="preview-main">
          <!-- <iframe id="iframe" ref="iframe" FrameBorder="0" :src="'http://192.168.5.49:8080/nuxt/activity/20190922/formMakeTest'" @load="getGFM" ></iframe> -->
        <div class="preview-iframe">
          <GenetateFormMobile insite="true" @on-change="handleDataChange" v-if="previewPhoneVisible" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs" ref="GenetateFormMobile">
            <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
          </GenetateFormMobile>

          <template slot="action">
            <el-button type="primary" @click="handleTest">获取数据</el-button>
            <el-button @click="handleReset">重置</el-button>
          </template>
        </div>
        </div>
        </div>
        </cus-dialog>


        <!--弹出导入JSON-->
        <cus-dialog
          :visible="uploadVisible"
          @on-close="uploadVisible = false"
          @on-submit="handleUploadJson"
          ref="uploadJson"
          width="800px"
          form
        >
          <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
          <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div>
        </cus-dialog>

        <!--弹出生成JSON框-->
        <cus-dialog
          :visible="jsonVisible"
          @on-close="jsonVisible = false"
          ref="jsonPreview"
          width="800px"
          form
        >

          <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>

          <template slot="action">
            <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">复制数据</el-button>
          </template>
        </cus-dialog>

        <!--弹出生成代码框-->
        <cus-dialog
          :visible="codeVisible"
          @on-close="codeVisible = false"
          ref="codePreview"
          width="800px"
          form
          :action="false"
        >
          <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
        </cus-dialog>
      </el-container>
    </el-main>
  </el-container>

</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import GenetateFormMobile from './GenetateFormMobile'
import Clipboard from 'clipboard'
import {basicComponents, layoutComponents, advanceComponents} from './componentsConfig.js'
import {loadJs, loadCss} from '../util/index.js'
import request from '../util/request.js'
import generateCode from './generateCode.js'

export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm,
    GenetateFormMobile
  },
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    basicFields: {
      type: Array,
      default: () => ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider', 'text']
    },
    advanceFields: {
      type: Array,
      default: () => ['blank', 'imgupload', 'editor', 'cascader']
    },
    layoutFields: {
      type: Array,
      default: () => ['grid', 'tab']
    }
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelLeft: 0,
          inputLeft: 20,
          inputRight: 0,
          paddingBottom: 12,
          labelPosition: 'right',
          size: 'small',
          labelFontSize: 14,
          labelFontWeight: false,
        },
      },
      iframeWin: {},
      phoneUrl:'',
      configTab: 'widget',
      widgetFormSelect: null,
      previewPCVisible: false,
      previewPhoneVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      remoteFuncs: {
        func_select (resolve) {
                // 下拉选择框 select_1566990949275
                // 获取到远端数据后执行回调函数
                // resolve(data)
                // 模拟数据获取
              setTimeout(() => {
                    const options = [
                            {value: 0, text: 'label1'},
                            {value: 1, text: 'label2'},
                            {value: 2, text: 'label3'},
                    ]
                 // 对象中 value、label 是设计器中配置的值和标签
                   resolve(options)
              }, 2000)
        },
        func_multiselect(resolve){
          setTimeout(() => {
               const options = [
                       {value: 'value1', text: 'label1',children:[{id: '0', text: 'child1label1'},{id: '1', text: 'child1label2'},{id: '2', text: 'child1label3'}]},
                       {value: 'value2', text: 'label2',children:[{id: '0', text: 'child2label1'},{id: '1', text: 'child2label2'}]},
                       {value: 'value3', text: 'label3'},
               ]
            // 对象中 value、label 是设计器中配置的值和标签
              resolve(options)
          }, 2000)
        },
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              {id: '1', name: '1111'},
              {id: '2', name: '2222'},
              {id: '3', name: '3333'}
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken (resolve) {
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback (response, file, fileList) {
          //console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [
    {
      "type": "input",
      "name": "单行文本",
      "icon": "icon-input",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908864000_94322"
      },
      "key": "1540908864000_94322",
      "model": "input_1540908864000_94322",
      "rules": [
        {
          "type": "string",
          "message": "单行文本格式不正确"
        }
      ]
    },
    {
      "type": "textarea",
      "name": "多行文本",
      "icon": "icon-diy-com-textarea",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908876000_19435"
      },
      "key": "1540908876000_19435",
      "model": "textarea_1540908876000_19435",
      "rules": []
    }
  ],
  "config": {
    labelWidth: 100,
    labelLeft: 0,
    inputLeft: 20,
    inputRight: 0,
    paddingBottom: 12,
    labelPosition: 'right',
    size: 'small',
    labelFontSize: 14,
    labelFontWeight: false,
    customClass: ''
  }
}`
    }
  },
  mounted () {
  },
  methods: {
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      //console.log("Cpmtaoner的结束")
      //console.log('end', evt)
    },
    handleMoveStart ({oldIndex}) {
      //console.log("Cpmtaoner的开始")
      //console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true     //为false时移出去也不会生成
    },

    //点击手机端预览
    handlePhonePreview () {

       this.previewPhoneVisible = true;

    },
    //点击PC端预览
    handlePCPreview () {
      //console.log(this.widgetForm)
      this.previewPCVisible = true
    },
    //获取数据
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e=>{})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    //重置
    handleReset () {
      this.$refs.generateForm.reset()
    },
    //点击生成JSON
    handleGenerateJson () {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      //console.log(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {

        const editor = ace.edit('jsoneditor')
        editor.session.setMode("ace/mode/json")

        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success('复制成功')
          })
        }
        this.jsonCopyValue = JSON.stringify(this.widgetForm)
      })
    },
    //生成代码
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode("ace/mode/html")
      })
    },
    //点击导入JSON
    handleUpload () {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.uploadEditor = ace.edit('uploadeditor')
        this.uploadEditor.session.setMode("ace/mode/json")
      })
    },
    //导入JSON确认
    handleUploadJson () {
      try {
        this.setJSON(JSON.parse(this.uploadEditor.getValue()))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    //在导入JSON确认时才用到
    setJSON (json) {
      this.widgetForm = json
      //console.log(json)
      if (json.list.length> 0) {
        this.widgetFormSelect = json.list[0]
      }
    },
    //点击清空
    handleClear () {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelLeft: 0,
          inputLeft: 20,
          inputRight: 0,
          paddingBottom: 12,
          labelPosition: 'right',
          size: 'small',
          labelFontSize: 14,
          labelFontWeight: false,
          customClass: ''
        },
      }
      this.widgetFormSelect = {}
    },
    getJSON () {
      return this.widgetForm
    },
    getHtml () {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    handleInput (val) {
      //console.log(val)
      this.blank = val
    },
    //预览框里用到
    handleDataChange (field, value, data) {
      //console.log(field, value, data)
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        //console.log(this.$refs.widgetForm)
      }
    }
  }
}
</script>

<style lang="scss">

.el-dialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    .el-dialog__header{
      padding: 30px 30px 20px;
    }
    .mobile-preview{
      position: relative;
      width: 398px;
      height: 735px;
      margin: auto;
      >img{
        max-width: 100%
      }
      .preview-main{
        position: absolute;
        top: 99px;
        left:54px;
          >iframe {
              width: 289px;
              height: 573px;
              border-bottom-right-radius: 30px;
              border-bottom-left-radius: 30px;
              background: #f5f7fa;
          }
          .preview-iframe {
             position: relative;
             width: 289px;
             height: 573px;
             border-bottom-right-radius: 30px;
             border-bottom-left-radius: 30px;
             background: #f5f7fa;
             overflow: auto;
          }
          >.van-dropdown-item {
            .van-overlay,.van-popup--top{
              left: -5%;
              width: 111%;
            }
          }
          .van-overlay {
            position: absolute;
          }
          .van-popup{
            position: absolute;
          }
          .van-field__control{
            line-height: 1.5;
          }
          .van-dropdown-item {
            position: inherit;
            margin: 0 14px;
            width: 100%;
            margin: 0 auto;
            padding: 10px;
            .van-dropdown-item__content {
              max-height: 300px;
            }
            .van-popup--top {
              top: 50px;
             }
          }

      }


    }


 }
.select-button{
   width: 112px;
   margin:20px auto;
}
.widget-empty{
  background-position: 50%;
}

</style>

<template>
  <div id="fromPage">
    <GenerateFormMobile
      :data="jsonData"
      :remote="remoteFuncs"
      :value="editData"
      ref="generateForm"
    >
  </GenerateFormMobile>
    <van-button type="primary" round size="large" @click="handleSubmit" color="#1989fa" class="bottom">提交</van-button>
  </div>
</template>

<script>

import GenerateFormMobile from "../components/GenetateFormMobile";

export default {
  components: { GenerateFormMobile },
  data () {
    return {
      jsonData:{"list":[{"type":"textarea","name":"多行文本","icon":"icon-diy-com-textarea","class":"","options":{"customClass":"","width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","display":false,"remoteFunc":"func_1574762124000_67457"},"key":"1574762124000_67457","model":"textarea_1574762124000_67457","rules":[]},{"type":"time","name":"时间选择器","icon":"icon-time","class":"","options":{"customClass":"","defaultValue":"","readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","isRange":false,"arrowControl":true,"format":"HH:mm:ss","required":false,"width":"","display":false,"remoteFunc":"func_1574762125000_3546"},"key":"1574762125000_3546","model":"time_1574762125000_3546","rules":[]},{"type":"date","name":"日期选择器","icon":"icon-date","class":"","options":{"customClass":"","defaultValue":"","readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","type":"date","format":"yyyy-MM-dd","timestamp":false,"required":false,"width":"","display":false,"remoteFunc":"func_1574762126000_37048"},"key":"1574762126000_37048","model":"date_1574762126000_37048","rules":[]}],"config":{"labelWidth":100,"labelLeft":0,"inputLeft":20,"inputRight":0,"paddingBottom":12,"labelPosition":"right","size":"small","labelFontSize":14,"labelFontWeight":false}},
      editData:{},
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
             }

      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.generateForm.getData().then(data => {
        // 数据校验成功
        // data 为获取的表单数据
        console.log(JSON.stringify(data));
      }).catch(e => {
        // 数据校验失败
        console.log('error');
      })
    }
  }
}
</script>
<style lang="scss"  rel="stylesheet/scss">
body{
   background-color: #ddd;
  //background-color:transparent;
  #GFM{
    width: 80%;
    margin: 15px auto;
    padding: 10px;
    background-color: rgba(236, 245, 255, 0.3);
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 3px 6px #ebedf0;
    .van-cell-group{
      border: none;
      //background-color:transparent;
    }

  }
  .bottom{
    position: relative;
    bottom: 0;
    width: 85%;
    margin-left: 7%;
  }
}

</style>

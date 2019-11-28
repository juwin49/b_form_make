<template>
  <!--表单属性-->
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item label="标签对齐方式">
        <el-radio-group v-model="data.labelPosition">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="center">居中</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <template v-if='data.labelPosition=="top"'>
          <div class='config_title'>标签左距离</div>
          <el-input-number v-model="data.labelLeft" :min="0" :max="200" :step="10"></el-input-number>
        </template>

        <div class='config_title'>标签字体大小</div>
        <el-input-number v-model="data.labelFontSize" :min="10" :max="32" :step="2"></el-input-number>

        <div class='config_title'>标签加粗 <el-checkbox v-model="data.labelFontWeight"></el-checkbox></div>
      </el-form-item>



      <el-form-item>
        <template v-if='data.labelPosition!="top"'>
          <div class='config_title'>输入框左距离</div>
          <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10"></el-input-number>
        </template>

        <template v-if='data.labelPosition=="top"'>
          <div class='config_title'>输入框左距离</div>
          <el-input-number v-model="data.inputLeft" :min="0" :max="200" :step="10"></el-input-number>
        </template>

        <div class='config_title'>输入框右距离</div>
        <el-input-number v-model="data.inputRight" :min="0" :max="200" :step="10"></el-input-number>
      </el-form-item>

      <el-form-item>
        <div class='config_title'>组件上下距离</div>
        <el-input-number v-model="data.paddingBottom" :min="0" :max="30" :step="1"></el-input-number>
      </el-form-item>

      <el-form-item>
        <div class='config_title'>组件尺寸</div>
        <el-radio-group v-model="data.size">
          <el-radio-button label="medium">medium</el-radio-button>
          <el-radio-button label="small">small</el-radio-button>
          <el-radio-button label="mini">mini</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data'],
  mounted () {
    //console.log('zuiwai',this.data)
  },
}
</script>

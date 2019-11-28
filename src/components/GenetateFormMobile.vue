<template>
  <div id="Gform">
    <div ref="generateForm" v-if="data.list">
      <template v-for="item in data.list">

        <template v-if="item.type == 'grid'">
          <van-grid id="GFM"
            :key="item.key"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :column-num="item.columns.length"
          >
            <van-grid-item v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              <template v-for="citem in col.list" >
                <div v-if="citem.type=='blank'" :label="citem.name" :prop="citem.model" :key="citem.key">
                  <slot :name="citem.model" :model="models"></slot>
                </div>
                <GenetateFormItemMobile v-else
                  :key="citem.key"
                  :models.sync="models"
                  :remote="remote"
                  :rules="rules"
                  :widget="citem"
                  :vantinit="vantinit"
                  @input-change="onInputChange">
                </GenetateFormItemMobile>
              </template>
            </van-grid-item>
          </van-grid>
        </template>

        <template v-else-if="item.type == 'blank'">
            <div :key="item.key">{{item.model}}</div>
        </template>

        <template v-else>
          <GenetateFormItemMobile
            :key="item.key"
            :models.sync="models"
            :rules="rules"
            :widget="item"
            @input-change="onInputChange"
            :remote="remote"
            :vantinit="vantinit">
          </GenetateFormItemMobile>
        </template>

      </template>
    </div>
  </div>
</template>

<script>
import GenetateFormItemMobile from './GenerateFormItemMobile'
import {loadJs} from '../util/index.js'

export default {
  name: 'fm-generate-form-mobile',
  components: {
    GenetateFormItemMobile
  },
  props: ['data', 'remote', 'value', 'insite'],
  data () {
    return {
      models: {},
      rules: {},
      vantinit:""
    }
  },
  created () {
    if(this.data.list){
      this.generateModle(this.data.list)
    }

  },
  mounted () {
  },
  methods: {
    generateModle (genList) {
      for (let i = 0; i < genList.length; i++) {
        //栅格布局
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list)
          })
        } else {
          //this.value:editData里给对应model赋的初始值
          if (this.value && Object.keys(this.value).indexOf(genList[i].model) >= 0) {
            this.models[genList[i].model] = this.value[genList[i].model]
          } else {
            if (genList[i].type === 'blank') {
              this.$set(this.models, genList[i].model, genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : []))
            } else {
              //defaultValue里给对应model赋的初始值
              this.models[genList[i].model] = genList[i].options.defaultValue
            }
          }

          if (this.rules[genList[i].model]) {

            this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
              if (item.pattern) {
                return {...item, pattern: eval(item.pattern)}
              } else {
                return {...item}
              }
            })]
          } else {

            this.rules[genList[i].model] = [...genList[i].rules.map(item => {
              if (item.pattern) {
                return {...item, pattern: eval(item.pattern)}
              } else {
                return {...item}
              }
            })]
          }
        }
      }
    },
    getData () {
      return new Promise((resolve, reject) => {
          resolve(this.models);
        //表单校验
        // this.$refs.generateForm.validate(valid => {
        //   if (valid) {
        //     resolve(this.models)
        //   } else {
        //     reject(new Error('表单数据校验失败').message)
        //   }
        // })
      })
    },
    reset () {
      this.$refs.generateForm.resetFields()
    },
    onInputChange (value, field) {
      this.$emit('on-change', field, value, this.models)
    },

    refresh () {

    }
  },
  watch: {
    data: {
      deep: true,
      handler (val) {
        this.generateModle(val.list)
      }
    },
    value: {
      deep: true,
      handler (val) {
        console.log(JSON.stringify(val))
        this.models = {...this.models, ...val}
      }
    }
  }

}
</script>

<style lang="scss">
#Gform{
  position: unset;
  height: 100%;
  overflow-y: auto;
}
</style>

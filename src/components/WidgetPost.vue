<template >
 <div class="widget-post-list">
  <template v-for="(element, index) in data.list">
    <widget-form-item v-if="element && element.key"  :key="element.key" :element="element" :select.sync="selectWidget" :index="index" :data="data" :item="data"></widget-form-item>
  </template>
 </div>
</template>

<script>
import WidgetFormItem from './WidgetFormItem'

export default {
  components: {
     WidgetFormItem
  },
  props: ['data', 'select'],
  data () {
    return {
      selectWidget: this.select
    }
  }
}
</script>
<style lang="scss">
.widget-post-list {
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 4px 3px 3px #eee;
    height: 800px;
    width: 600px;
    margin: 10px auto;
}
<style>

<template>
  <div id="move"  ref="moveItem"  v-drag>       <!--绑定按下事件-->
    {{positionX}}
    {{positionY}}
  </div>
</template>
<script>
export default {
data () {
  return {
    positionX:0,
    positionY:0
  }
},
methods:{
        // move(e){
        //     let odiv = e.target;        //获取目标元素
        //     console.log(e,22)
        //     //算出鼠标相对元素的位置
        //     let disX = e.clientX - odiv.offsetLeft;
        //     let disY = e.clientY - odiv.offsetTop;
        //     document.onmousemove = (e)=>{       //鼠标按下并移动的事件
        //       console.log(e,44)
        //         //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        //         let left = e.clientX - disX;
        //         let top = e.clientY - disY;
        //
        //         //绑定元素位置到positionX和positionY上面
        //         this.positionX = top;
        //         this.positionY = left;
        //
        //         //移动当前元素
        //         odiv.style.left = left + 'px';
        //         odiv.style.top = top + 'px';
        //     };
        //     document.onmouseup = (e) => {
        //         document.onmousemove = null;
        //         document.onmouseup = null;
        //     };
        // }

    },
    directives: {
       drag: {
           // 指令的定义
           bind: function (el) {
               let odiv = el;   //获取当前元素
               console.log(el,11)
               odiv.onmousedown = (e) => {
                   //算出鼠标相对元素的位置
                   let disX = e.clientX - odiv.offsetLeft;
                   let disY = e.clientY - odiv.offsetTop;
                    console.log(disX,22)
                   document.onmousemove = (e)=>{
                     console.log(disX,33)
                       //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                       let left = e.clientX - disX;
                       let top = e.clientY - disY;

                       //绑定元素位置到positionX和positionY上面
                       this.positionX = top;
                       this.positionY = left;

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
    computed:{},
}
</script>


<style lang="scss">
    #move{
        position: relative;     /*定位*/
        top: 10px;
        left: 10px;
        width: 200px;
        height: 200px;
        background: #666;       /*设置一下背景*/
    }
</style>

<template>
  <div class="contain">
    <h2 class="num">{{ count }}</h2>
    <hr />
    <button @click="update" class="btn">更新</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    // 定义响应式数据 ref对象
    const count = ref(1);
    // console.log(count);

    // 更新响应式数据的函数
    function update() {
      // alert('update')
      count.value = count.value + 1;
    }

    return {
      count,
      update,
    };
  },
};
</script>

<style lang="less" scoped>
.contain {
  .num {
    color: red;
  }
  .btn {
    width: 60px;
    height: 30px;
    background-color: skyblue;
    border-style: none;
  }
  .btn:hover{
    cursor: pointer;
  }
}
</style>

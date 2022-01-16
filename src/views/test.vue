<template>
  <div>
    <h2>name: {{ state.name }}</h2>
    <h2>age: {{ state.age }}</h2>
    <h2>wife: {{ state.wife }}</h2>
    <hr />
    <button @click="update">更新</button>
    <div class="test">
      <div class="bt"></div>
    </div>
  </div>
</template>


<script>
import { onMounted, ref, reactive, toRefs } from "vue";

export default {
  setup() {
    /* 
    定义响应式数据对象
    */
    const state = reactive({
      name: "tom",
      age: 25,
      wife: {
        name: "marry",
        age: 22,
      },
    });
    console.log(state, state.wife);

    const update = () => {
      state.name += "--";
      state.age += 1;
      state.wife.name += "++";
      state.wife.age += 2;
    };

    return {
      state,
      update,
    };
  },
};
</script>

<style lang="scss" scoped>
/* 定义变量与值 */
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;
$btb: red;
/* 使用变量 */
body {
  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
}
.test {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  .bt {
    width: 50px;
    height: 50px;
    background-color: $btb;
  }
}
</style>

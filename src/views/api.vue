<template>
  <div>
    <input type="text" ref="inputRef" />
    <h2>App</h2>
    <h3>foo: {{ foo }}</h3>
    <h3>bar: {{ bar }}</h3>
    <h3>foo2: {{ foo2 }}</h3>
    <h3>bar2: {{ bar2 }}</h3>
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRefs } from "vue";
import axios from 'axios'
export default {
  setup() {
    const state = reactive({
      foo: "a",
      bar: "b",
    });
    const inputRef = ref(null);

    onMounted(() => {
      inputRef.value && inputRef.value.focus();
      axios
        .get('./data/products.json')
        .then((response) => {
          loading.value = false;
          result.value = response.data;
        })
        .catch((e) => {
          loading.value = false;
          errorMsg.value = e.message || "未知错误";
        });
    });

    const stateAsRefs = toRefs(state);

    setTimeout(() => {
      state.foo += "++";
      state.bar += "++";
    }, 2000);

    const { foo2, bar2 } = useReatureX();

    return {
      // ...state,
      ...stateAsRefs,
      foo2,
      bar2,
      inputRef,
    };
  },
};
function useReatureX() {
  const state = reactive({
    foo2: "a",
    bar2: "b",
  });

  setTimeout(() => {
    state.foo2 += "++";
    state.bar2 += "++";
  }, 2000);

  return toRefs(state);
}
</script>

<style lang="scss" scoped></style>

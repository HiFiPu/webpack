<template>
    <li>{{ todo.text }}</li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
};
</script>

<style lang="scss" scoped></style>

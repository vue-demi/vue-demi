<template>
  <div>{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue-demi';
export default defineComponent({
  setup() {
    const title: Ref<string> = ref('home');
    return {
      title,
    };
  },
});
</script>
<style lang="less" scoped></style>

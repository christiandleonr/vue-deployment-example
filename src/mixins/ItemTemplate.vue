<template>
  <div class="input-style">
    <b>{{ item.rpe }}</b>
    <span>{{ item.name }}</span>
  </div>
</template>
 
<script>
export default {
  props: {
    item: { required: true },
  },
};
</script>

<style scoope>

input-style {
  width: 340px !important;
}
</style>>
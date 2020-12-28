<template>
  <div class="home">
    <Button to="/list">看大片</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button } from "vant";

export default defineComponent({
  name: "Home",
  components: { Button },
});
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="home">
    <Button type="primary" to="/list">随便看一下</Button>
    <Button type="primary" to="/search">搜索关键词</Button>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .van-button:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>

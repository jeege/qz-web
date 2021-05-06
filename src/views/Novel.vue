<template>
  <Sticky>
    <form action="/">
      <Search
        v-model="state.queryParams.keyword"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      ></Search>
    </form>
  </Sticky>
  <List
    v-model:loading="state.loading"
    :finished="state.finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <Cell
      v-for="item in state.list"
      center
      title-class="item-wrap"
      :key="item.novelId"
      :title="item.novelName"
    >
      <template #title>
        <span class="custom-title">{{ item.novelName }}</span>
        <div class="evaluation">
          <span>好评：{{ item.a }}</span>
          <span>差评：{{ item.e }}</span>
        </div>
        <p class="btn-wrap">
          <Button
            type="default"
            size="small"
            :url="`http://www.zxcs.me/post/${item.novelId}`"
            >查看详情</Button
          >
          <Button
            type="primary"
            size="small"
            :url="`http://www.zxcs.me/download.php?id=${item.novelId}`"
            >前往下载</Button
          >
        </p>
      </template>
    </Cell>
  </List>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { List, Cell, Toast, Button, Sticky, Search } from "vant";
import { getNovelList } from "@/utils/api";
import { NovelItem } from "@/dto/novelList";
export default defineComponent({
  setup() {
    const initQueryParams = {
      pageNo: 1,
      pageSize: 20,
      orderBy: "a_DESC",
      keyword: "",
    };
    const initList: NovelItem[] = [];
    const state = reactive({
      list: initList,
      loading: false,
      finished: false,
      queryParams: initQueryParams,
    });
    const onLoad = async () => {
      try {
        const res = await getNovelList(state.queryParams);
        state.loading = false;
        if (res.list.length) {
          state.list = [...state.list, ...res.list];
        }
        if (state.list.length === res.total) {
          state.finished = true;
        }
        if (state.queryParams.pageNo) {
          state.queryParams.pageNo = Number(state.queryParams.pageNo) + 1;
        }
      } catch (error) {
        Toast(error);
      }
    };

    const onSearch = () => {
      state.queryParams.pageNo = 1;
      state.list = [];
      state.finished = false;
      onLoad();
    };
    return {
      state,
      onLoad,
      onSearch,
    };
  },
  components: { List, Cell, Button, Sticky, Search },
});
</script>

<style lang="less" scoped>
.item-wrap {
  .custom-title {
    font-size: 16px;
    font-weight: 600;
  }
  .evaluation {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 5px 0;
    .evaluation-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      img {
        width: 36px;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0;
    .van-button {
      width: 120px;
    }
  }
}
</style>

<template>
  <div class="about">
    <Sticky>
      <Search
        v-model="queryParams.keywords"
        placeholder="请输入搜索关键词"
      ></Search>
    </Sticky>
    <List>
      <Cell
        v-for="vItem in state.list"
        :key="vItem.vodid"
        class="list-item"
        @click="itemClickHandle(vItem)"
      >
        <template v-slot:title>
          <Image class="img-box" fit="cover" lazy-load :src="vItem.coverpic">
            <template v-slot:loading>
              <Loading type="spinner" size="20" />
            </template>
          </Image>
        </template>
        <div class="info">
          <p>{{ vItem.title }}</p>
          <Row>
            <Col span="8" class="info-indicators"
              ><Icon name="star-o" />{{ vItem.scorenum }}
            </Col>
            <Col span="8" class="info-indicators"
              ><Icon name="like-o" />{{ vItem.upnum }}
            </Col>
            <Col span="8" class="info-indicators"
              ><Icon name="eye-o" />{{ vItem.playcount_total }}
            </Col>
          </Row>
        </div>
      </Cell>
    </List>
    <div class="fix-bottom">
      <Pagination
        v-model="queryParams.page"
        force-ellipses
        :total-items="state.total"
        :show-page-size="4"
      >
        <template #prev-text>
          <Icon name="arrow-left" />
        </template>
        <template #next-text>
          <Icon name="arrow" />
        </template>
        <template #page="{ text }">{{ text }}</template>
      </Pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent, watchEffect, computed } from "vue";
import {
  Search,
  List,
  Cell,
  Sticky,
  Image,
  Loading,
  Row,
  Col,
  Icon,
  Pagination,
} from "vant";
import { getVideoUrl, searchList } from "@/utils/api";
import * as dto from "@/dto/searchDto";
import { Vodrows } from "@/dto/searchList";

const { typeList, sortList, ...otherList } = dto;

interface SearchPageState {
  list: Vodrows[];
  queryParams: {
    keywords: string;
    page: number;
  };
  total: number;
}

export default defineComponent({
  setup() {
    const item = ref(null);
    const state: SearchPageState = reactive({
      list: [],
      total: 0,
      queryParams: {
        keywords: "",
        page: 1,
      },
    });
    const queryParams = computed(() => state.queryParams);
    watchEffect(async () => {
      if (queryParams.value.keywords) {
        const res = await searchList({ ...queryParams.value });
        state.list = res.data.vodrows;
        state.total = res.data.pageinfo.total;
      }
    });
    return {
      item,
      state,
      queryParams,
      typeList,
      sortList,
      otherList,
    };
  },
  components: {
    Search,
    List,
    Cell,
    Sticky,
    Image,
    Loading,
    Row,
    Col,
    Icon,
    Pagination,
  },
  methods: {
    async itemClickHandle(item: Vodrows) {
      const res = await getVideoUrl(item.vodid);
      const videoUrl = res.data.httpurl || res.data.httpurl_preview;
      if (!videoUrl) {
        this.$toast("视频链接不存在，请浏览其他视频");
        return;
      }
      window.open(videoUrl);
    },
  },
});
</script>

<style lang="less" scoped>
.list-item {
  ::v-deep(.van-cell__title) {
    flex: 0.48;
  }
  ::v-deep(.van-cell__value) {
    flex: 0.52;
  }
  .img-box {
    width: 100%;
    height: 120px;
    background-color: #eee;
    outline: 0;
    border: none;
    display: block;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding-left: 8px;
    text-align: left;
    p {
      margin: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .info-indicators {
      display: flex;
      align-items: center;
      i.van-icon {
        margin-right: 3px;
      }
      &:nth-child(2) {
        justify-content: center;
      }
      &:last-child {
        justify-content: flex-end;
      }
    }
  }
}
.fix-bottom {
  height: 50px;
  .van-pagination {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -2px 12px rgba(100, 101, 102, 0.12);
  }
}
</style>

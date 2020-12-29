<template>
  <div class="about">
    <Sticky>
      <DropdownMenu>
        <DropdownItem v-model="queryParams.type" :options="typeList" />
        <DropdownItem v-model="queryParams.sort" :options="sortList" />
        <!-- <DropdownItem title="其他筛选" ref="item"></DropdownItem> -->
      </DropdownMenu>
    </Sticky>
    <List>
      <Cell
        v-for="vItem in state.list"
        :key="vItem.vodid"
        class="list-item"
        @click="itemClickHandle(vItem)"
      >
        <template v-slot:title>
          <!-- <Image class="img-box" fit="cover" lazy-load :src="vItem.coverpic"> -->
          <Image class="img-box" fit="cover" lazy-load>
            <template v-slot:loading>
              <Loading type="spinner" size="20" />
            </template>
          </Image>
        </template>
        <div class="info">
          <!-- <p>{{ vItem.title }}</p> -->
          <p>{{ "111" }}</p>
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
import { reactive, ref, defineComponent, watch, computed } from "vue";
import {
  DropdownMenu,
  DropdownItem,
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
import { getList, getVideoUrl } from "@/utils/api";
import * as dto from "@/dto/searchDto";
import { Vodrows } from "@/dto/list";
import { useRoute, useRouter } from "vue-router";

const { typeList, sortList, ...otherList } = dto;

interface ListPageState {
  list: Vodrows[];
  queryParams: dto.SearchDto;
  total: number;
}

export default defineComponent({
  setup() {
    const item = ref(null);
    const route = useRoute();
    const router = useRouter();
    const state: ListPageState = reactive({
      list: [],
      total: 0,
      queryParams: {
        type: "0",
        sort: "0",
        ma: "0",
        area: "0",
        year: "0",
        lan: "0",
        clarity: "0",
        size: "0",
        page: 1,
        ...route.query,
      },
    });

    const queryParams = computed(() => {
      return state.queryParams;
    });

    watch(
      queryParams,
      () => {
        router.push({
          path: "/list",
          query: { ...queryParams.value },
        });
      },
      {
        immediate: true,
        deep: true,
      }
    );
    watch(
      () => route.query,
      () => {
        getList({
          ...queryParams.value,
          ...route.query,
        }).then((res) => {
          state.list = res.data.vodrows;
          state.total = res.data.pageinfo.total;
        });
      },
      {
        deep: true,
      }
    );

    // watch([queryParams], () => {
    //   console.log(queryParams.value);
    // });

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
    DropdownMenu,
    DropdownItem,
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

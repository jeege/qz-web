import axios from "axios";
import { SearchDto } from "@/dto/searchDto";
import { XjList } from "@/dto/list";
import { VideoDetail } from "@/dto/video";
import { SearchList } from "@/dto/searchList";
import { NovelRes } from "@/dto/novelList";
import { Pagination } from "@/dto/pagination";

// const apiUrl = 'https://103.219.176.60'

export const getList = async (data: SearchDto): Promise<XjList> => {
  const reqUrl = `/apiXj/vod/listing-${data["type"]}-${data["area"]}-${data["year"]}-${data["clarity"]}-${data["size"]}-0-${data["ma"]}-${data["lan"]}-${data["sort"]}-${data["page"]}`;
  const res = await axios.get(reqUrl, {
    params: {
      apiVersion: 28,
      deviceModel: "MI 9",
      brand: "Xiaomi",
      deviceName: "cepheus",
      serial: "72a353b0",
      platform: "android",
      version: "3.5.1",
      _t: Date.now(),
    },
  });
  return res.data;
};

export const getVideoUrl = async (id: string): Promise<VideoDetail> => {
  const res = await axios.get(`/apiXj/vod/reqplay/${id}`, {
    params: {
      apiVersion: 28,
      deviceModel: "MI 9",
      brand: "Xiaomi",
      deviceName: "cepheus",
      serial: "72a353b0",
      platform: "android",
      version: "3.5.1",
      _t: Date.now(),
    },
  });
  return res.data;
};

export const searchList = async ({
  keywords,
  page,
}: {
  keywords: string;
  page: number;
}): Promise<SearchList> => {
  const res = await axios.get(`/apiXj/search`, {
    params: {
      wd: keywords,
      page,
      apiVersion: 28,
      deviceModel: "MI 9",
      brand: "Xiaomi",
      deviceName: "cepheus",
      serial: "72a353b0",
      platform: "android",
      version: "3.5.1",
      _t: Date.now(),
    },
  });
  return res.data;
};

export const getNovelList = async ({
  pageSize = 20,
  pageNo = 1,
  orderBy = "a_DESC",
  keyword = "",
}: Pagination & { keyword: string }): Promise<NovelRes> => {
  const res = await axios.get(`/apiNovel/novel/list`, {
    params: {
      pageSize,
      pageNo,
      orderBy,
      keyword,
    },
  });
  if (res.data.code === 200) {
    return res.data.data;
  } else {
    return Promise.reject(new Error("出错了"));
  }
};

interface Option {
  text: string;
  value: number | string;
  icon?: string;
}
// 类型
export const typeList: Option[] = [
  { value: "0", text: "全部类型" },
  { value: "4", text: "偷拍自拍" },
  { value: "5", text: "制服诱惑" },
  { value: "6", text: "清纯少女" },
  { value: "7", text: "辣妹大奶" },
  { value: "8", text: "女同专属" },
  { value: "9", text: "素人出演" },
  { value: "10", text: "角色扮演" },
  { value: "11", text: "成人动漫" },
  { value: "12", text: "人妻熟女" },
  { value: "13", text: "变态另类" },
  { value: "14", text: "经典伦理" },
];

// 排序
export const sortList: Option[] = [
  { value: "0", text: "综合排序" },
  { value: "1", text: "最多好评" },
  { value: "2", text: "最多播放" },
  { value: "3", text: "最高评分" },
];

// 码
export const maList: Option[] = [
  { value: "0", text: "全部" },
  { value: "1", text: "有码" },
  { value: "2", text: "无码" },
];

// 地区
export const areaList: Option[] = [
  { value: "0", text: "全部" },
  { value: "2", text: "国产" },
  { value: "3", text: "日本" },
  { value: "8", text: "台湾" },
  { value: "5", text: "韩国" },
  { value: "7", text: "香港" },
  { value: "6", text: "欧美" },
];

// 年代
export const yearList: Option[] = [
  { value: "0", text: "全部" },
  { value: "6", text: "2019" },
  { value: "3", text: "2018" },
  { value: "5", text: "2010-2017" },
  { value: "4", text: "00年代" },
  { value: "1", text: "90年代" },
];

// 语言
export const lanList: Option[] = [
  { value: "0", text: "全部" },
  { value: "1", text: "中字" },
  { value: "2", text: "国语" },
  { value: "3", text: "其他" },
];

// 清晰度
export const clarityList: Option[] = [
  { value: "0", text: "全部" },
  { value: "1", text: "高清" },
  { value: "2", text: "标清" },
];

// 清晰度
export const sizeList: Option[] = [
  { value: "0", text: "全部" },
  { value: "1", text: "长片" },
  { value: "2", text: "短片" },
];

export interface SearchDto {
  type?: string;
  sort?: string;
  ma?: string;
  area?: string;
  year?: string;
  lan?: string;
  clarity?: string;
  size?: string;
  page?: number;
}

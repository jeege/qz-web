/*Params*/
export class Params {
  cateid: string;
  areaid: string;
  yearid: string;
  definition: string;
  duration: string;
  freetype: string;
  mosaic: string;
  langvoice: string;
  orderby: string;
  page: string;
}

/*Tags*/
export class Tags {
  tagid: string;
  tagtype: string;
  tagname: string;
  itemcount: string;
}

/*Actor_tags*/
export class Actor_tags {
  tagid: string;
  tagtype: string;
  tagname: string;
  itemcount: string;
}

/*Vodrows*/
export class Vodrows {
  vodid: string;
  title: string;
  intro: string;
  coverpic: string;
  createtime: string;
  updatetime: string;
  vodkey: string;
  scorenum: string;
  upnum: string;
  downnum: string;
  authorid: string;
  author: string;
  play_url: string;
  down_url: string;
  definition: string;
  duration: string;
  yearid: string;
  yearname: string;
  mosaic: string;
  portrait: string;
  view_price: string;
  limit_free: number;
  isvip: string;
  islimit: string;
  islimitv3: string;
  exclusive: number;
  commentcount: string;
  playcount_total: string;
  downcount_total: number | string;
  tags: Tags[];
  actor_tags: Actor_tags[];
  areaid: string;
  areaname: string;
  cateid: string;
  catename: string;
  playlist: null[];
  downlist: null[];
  episode_total: string;
  episode_status: string;
  playindex: number;
}

/*Plist*/
export class Plist {
  pos: string;
  page: number;
  text: string;
  url: string;
}

/*Pageinfo*/
export class Pageinfo {
  plist: Plist[];
  pagesize: number;
  total: number;
  totalpage: number;
  page: number;
  start: number;
  end: number;
  prev: number;
  next: number;
  curr_url: string;
  first_url: string;
  prev_url: string;
  next_url: string;
  last_url: string;
  page_url: string;
  pages: number[];
}

/*Orders*/
export class Orders {
  keyid: number;
  value: string;
}

/*Categories*/
export class Categories {
  cateid: string;
  parentid: string;
  uuid: string;
  catename: string;
}

/*Areas*/
export class Areas {
  areaid: string;
  areaname: string;
  sortnum: string;
}

/*Years*/
export class Years {
  yearid: string;
  yearname: string;
  sortnum: string;
}

/*Definitions*/
export class Definitions {
  keyid: number;
  value: string;
}

/*Durations*/
export class Durations {
  keyid: number;
  value: string;
}

/*Freetypes*/
export class Freetypes {
  keyid: number;
  value: string;
}

/*Mosaics*/
export class Mosaics {
  keyid: number;
  value: string;
}

/*Langvoices*/
export class Langvoices {
  keyid: number;
  value: string;
}

/*Data*/
export class Data {
  now: number;
  action: string;
  sample_params: string;
  params: Params;
  vodrows: Vodrows[];
  pageinfo: Pageinfo;
  orders: Orders[];
  categories: Categories[];
  areas: Areas[];
  years: Years[];
  definitions: Definitions[];
  durations: Durations[];
  freetypes: Freetypes[];
  mosaics: Mosaics[];
  langvoices: Langvoices[];
}

/*xjList*/
export class XjList {
  retcode: number;
  errmsg: string;
  data: Data;
}

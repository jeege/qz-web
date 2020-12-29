/*Tags*/
export class Tags {
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
  playcount_total: number;
  downcount_total: number;
  tags: Tags[];
  actor_tags: any;
  areaid: string;
  areaname: string;
  cateid: string;
  catename: string;
  playlist: any;
  downlist: any;
  episode_total: string;
  episode_status: string;
  playindex: number;
}

/*Plist*/
export class Plist {
  pos: string;
  page: number;
  text: number;
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

/*Data*/
export class Data {
  xxx_api_auth: string;
  vodrows: Vodrows[];
  pageinfo: Pageinfo;
}

/*tsModel5*/
export class SearchList {
  retcode: number;
  errmsg: string;
  data: Data;
}

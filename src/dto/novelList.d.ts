/*List*/
export class NovelItem {
  id: number;
  novelId: string;
  novelName: string;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
}

/*NovelRes*/
export class NovelRes {
  list: NovelItem[];
  itemCount: number;
  total: number;
  totalPages: number;
  pageNo: number;
  pageSize: number;
}

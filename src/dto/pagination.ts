export interface Pagination {
  pageNo?: string | number;
  pageSize?: number | string;
  orderBy?: string;
  orderValue?: "DESC" | "ASC";
}

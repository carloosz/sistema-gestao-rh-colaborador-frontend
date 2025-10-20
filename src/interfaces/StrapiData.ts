export interface IStrapiData<T> {
  data: T;
}

export interface IStrapiArray<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IStudent {
  id: number;
  name: string;
  address: string;
  gender: string;
  date: Date;
  search: string;
}
export interface StudentState {
  students: IStudent[];
  searchTerm: string;
  currentPage: number;
  pageSize: number;
}

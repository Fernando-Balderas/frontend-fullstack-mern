export default interface IBook {
  _id: string;
  title: string;
  author: string;
  description: string;
}
export const IBookDefaults = {
  _id: "",
  title: "",
  author: "",
  description: "",
};

export type TFnCreateBook = (book: IBook) => void;

export type TFnRemoveBook = (id: string, index: number) => void;
export const TFnRemoveBookDefault = (id: string, index: number) => {};

export type TFnPaginate = (pageNumber: number) => void;
export const TFnPaginateDefault = (pageNumber: number) => {};
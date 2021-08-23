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

export default interface IRemoveBook {
  id: string;
  index: number;
}


export interface KanapItem {
  description: string;
  _id: string;
  name: string;
  price: number;
  colors: string[];
  imageUrl: string;
  altTxt: string;
}

export interface KanapProps{
  item: KanapItem;
  mode: string;
}
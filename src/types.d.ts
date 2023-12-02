export interface CATEGORY {
  id: string;
  title: string;
}

export interface Quote {
  id: string;
  category: string;
  author: string;
  text: string;
}

export interface QuoteMutation {
  category: string;
  author: string;
  text: string;
}
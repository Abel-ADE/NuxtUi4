export interface Scale {
  id: number;
  slug: string;
  name: string;
  description: string;
  questions?: Question[];
  interpretations?: Interpretation[];
  categories_scales?: Categories_Scale[];
}

export interface Question {
  id: number;
  id_scale: number;
  title: string;
  description?: string;
  responses: Response[];
}

export interface Response {
  id: number;
  id_question: number;
  label: string;
  description?: string;
  value: number;
}

export interface Interpretation {
  id: number;
  id_scale: number;
  min: number;
  max: number;
  conclusion: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface Categories_Scale{
  id: number,
  id_scale?: number;
  id_category?: number;
  categories: Category;
}

export interface ResponsesScale {
  questionId: number;
  value: number;
}

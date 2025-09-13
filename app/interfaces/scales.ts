export interface Scale {
  id: number,
  slug: string,
  name: string,
  description: string,
  questions?: Question[],
  interpretations?: Interpretation[],
}

export interface Question {
  id: number,
  id_scale: number,
  title: string,
  description?: string,
  responses: Response[],
}

export interface Response {
  id: number,
  id_question: number,
  label: string,
  description?: string,
  value: number
}

export interface Interpretation {
  id: number,
  id_scale: number,
  min: number,
  max: number,
  conclusion: string,
}
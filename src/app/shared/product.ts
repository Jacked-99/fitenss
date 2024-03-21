export interface Product {
  id: string;
  name: string;
  imgSrc: string;
  data: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    sugar: number;
    fiber: number;
  };
  desc: string;
}

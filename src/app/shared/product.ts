export interface Product {
  id: string;
  name: string;
  data: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    sugar: number;
  };
  desc: string;
}

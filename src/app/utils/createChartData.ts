import { Intake } from '../shared/intake';
interface chartData {
  labels: string[];
  values: { [key: string]: number }[];
  totalCalories: number;
}
export const createChartData = (values: Intake[]): chartData => {
  let tempObj: chartData = { labels: [], values: [], totalCalories: 0 };
  values.forEach((item) => {
    let keys = Object.keys(item).filter(
      (key) => key != 'product' && key != 'calories'
    );
    tempObj.labels = [...keys].map((key) => {
      return key.charAt(0).toUpperCase() + key.slice(1);
    });
    tempObj.totalCalories += item.calories;
    //dodac wrzucanie wartosci do values oraz reduce żeby je sumowac
    // for (let key of keys) {
    //   item[key];
    // }
    // tempObj.values = [item[key]];
  });
  //   tempObj.totalCalories = values.reduce()
  return tempObj;
};

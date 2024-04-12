import { Intake } from '../shared/intake';

interface chartDataValues {
  nutr: string;
  value: number;
}
interface chartData {
  labels: string[];
  values: chartDataValues[];
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

    for (let key of keys) {
      tempObj.values.push({
        nutr: key,
        value: +item[key as keyof typeof item],
      });
    }
  });

  tempObj.values = tempObj.values.reduce(
    (accumulator: chartDataValues[], currentValue: chartDataValues) => {
      let existingObj = accumulator.find(
        (val) => val.nutr == currentValue.nutr
      );
      if (!existingObj) {
        accumulator.push(currentValue);
      } else {
        accumulator[accumulator.indexOf(existingObj)].value +=
          currentValue.value;
      }
      return accumulator;
    },
    [] as chartDataValues[]
  );
  return tempObj;
};

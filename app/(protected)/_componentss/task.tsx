"use client";

import { useEffect } from "react";

const expenses = {
  "2023-01": {
    "01": { food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19], fuel: [210.22] },
    "09": { food: [11.9], fuel: [190.22] },
  },
  "2023-03": {
    "07": { food: [20, 11.9, 30.2, 11.9] },
    "04": { food: [10.2, 11.5, 2.5], fuel: [] },
  },
  "2023-04": {},
};

interface ExpensesType {
  [yearMonth: string]: {
    [day: string]: {
      [category: string]: number[];
    };
  };
}

export const Task = () => {
  const getFirstSunday = (year: number, month: number): number => {
    for (let day = 1; day <= 7; day++) {
      const date = new Date(year, month - 1, day);
      if (date.getDay() === 0) {
        return day;
      }
    }
  };

  function calculateMedian(expenses: number[]): number | null {
    expenses.sort((a, b) => a - b);

    const n = expenses.length;
    if (n === 0) return null;

    const isEven = n % 2 === 0;

    if (isEven) {
      const mid1 = expenses[n / 2 - 1];
      const mid2 = expenses[n / 2];
      return (mid1 + mid2) / 2;
    } else {
      const mid = Math.floor(n / 2);
      return expenses[mid];
    }
  }

  const solution1 = (expenses: ExpensesType) => {
    let allExpenses: number[] = [];

    for (const month in expenses) {
      const year = parseInt(month.slice(0, 4), 10);
      const monthNumber = parseInt(month.slice(5), 10);

      const firstSunday = getFirstSunday(year, monthNumber);
      if (firstSunday === -1) continue;

      const validDays = Object.keys(expenses[month]).filter(
        (day) => parseInt(day, 10) <= firstSunday
      );

      if (validDays.length < 1) continue;

      validDays.forEach((day) => {
        const dailyExpenses = expenses[month][day];
        const foodExpenses = dailyExpenses.food || [];
        const fuelExpenses = dailyExpenses.fuel || [];

        allExpenses = [...allExpenses, ...foodExpenses, ...fuelExpenses];
      });
    }

    const median = calculateMedian(allExpenses);
    console.log("Mediana wydatków: ", median);
  };

  useEffect(() => {
    solution1(expenses);
  }, []);

  return <div>Task</div>;
};

// 0 - Niedziela (Sunday),
// 1 - Poniedziałek (Monday),
// 2 - Wtorek (Tuesday),
// 3 - Środa (Wednesday),
// 4 - Czwartek (Thursday),
// 5 - Piątek (Friday),
// 6 - Sobota (Saturday).

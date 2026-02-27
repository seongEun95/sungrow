export interface EnergyData {
  label: string;
  value: string;
  icon: 'orange' | 'yellow' | 'blue' | 'green';
}

export interface ChartDataPoint {
  time: string;
  value: number;
  [key: string]: string | number;
}

export interface WeeklyData {
  date: string;
  charge: number;
  discharge: number;
}

export interface MenuItem {
  icon: any;
  label: string;
  active: boolean;
}

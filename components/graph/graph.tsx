import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataSetItem {
  label: string,
  data: Array<number>,
  borderColor: string,
  backgroundColor: string
}
interface ChartData {
  labels: Array<number | string>,
  datasets: Array<DataSetItem>
}

interface ChartOptions {
  responsive: Boolean,
  plugins: {
    legend: {
      position: string
    },
    title: {
      display: Boolean,
      text: string
    }
  }
}
  
  // export const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top' as const,
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Line Chart',
  //     },
  //   },
  // };
  
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  

export default function Graph({data, options}: {data: ChartData, options: ChartOptions}) {
    return <Line options={options} data={data} />;
}
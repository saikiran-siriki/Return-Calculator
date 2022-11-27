import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { PriceData } from '../../interfaces/assets'
import styles from './graph.module.scss'





  
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

  

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>): JSX.Element => {
    if (active && payload && payload.length>0) {
      console.log(payload)
      const toolTipDisplayMap: { [key: string]: string } = {
        currentValue: 'Current Portfolio Value',
        totalValue: 'Total Invested Amount'
      }
      const dataKey = payload[0].dataKey as string
      return (
        <div className={styles.custom_tooltip}>
          <p className="desc">{toolTipDisplayMap[dataKey]}</p>
        </div>
      );
    }
    return <></>
  };
  

export default function Graph({ asset, data}: { data:PriceData, asset: string }) {
    // const data = [
    //     {
    //       totalValue: 200,
    //       currentValue: 300
    //     },
    //   ];
  
      return (<ResponsiveContainer width="95%" height={300}><BarChart data={data} barCategoryGap="10%">
      
      <XAxis hide={true}/>
      <YAxis />
        <Tooltip cursor={false} shared={false} content={<CustomTooltip />} offset={20}/>
      <Legend wrapperStyle={{ position: 'relative' }} />
        <Bar dataKey="totalValue" name="Total Invested Amount" fill="var(--success)" />
        <Bar dataKey="currentValue" name="Current Portfolio Value" fill="var(--danger)" />
      </BarChart></ResponsiveContainer>
      );
}
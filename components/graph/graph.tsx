import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { PriceData } from '../../interfaces/assets'
import styles from './graph.module.scss'

import type { RootState } from '../../state/store'
import { useSelector } from 'react-redux'



  
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
      const toolTipDisplayMap: { [key: string]: string } = {
        totalInvested: 'Current Portfolio Value',
        currentPortfolioValue: 'Total Invested Amount'
      }
      const dataKey = payload[0].dataKey as string
      return (
        <div className={styles.custom_tooltip}>
          <p className="desc">{toolTipDisplayMap[dataKey]}: <span className='weight500'>${payload[0].value}</span></p>
        </div>
      );
    }
    return <></>
  };
  

export default function Graph({}: { data:PriceData, asset: string }) {
    // const data = [
    //     {
    //       totalValue: 200,
    //       currentValue: 300
    //     },
    //   ];

    const totalInvested = useSelector((state: RootState) => state.calculator.totalInvestedSoFar)
    const currentPortfolioValue = useSelector((state: RootState) => state.calculator.currentPortfolioValue)

    function getData() {
      return [
        {
          totalInvested,
          currentPortfolioValue
        }
      ]
    }
  
      return (<ResponsiveContainer width="95%" height={300}><BarChart data={getData()} barCategoryGap="10%">
      
      <XAxis hide={true}/>
      <YAxis />
        <Tooltip cursor={false} shared={false} content={<CustomTooltip />} offset={20}/>
      <Legend wrapperStyle={{ position: 'relative' }} />
        <Bar dataKey="totalInvested" name="Total Invested Amount" fill="var(--alt-6)" />
        <Bar dataKey="currentPortfolioValue" name="Current Portfolio Value" fill="var(--alt-7)" />
      </BarChart></ResponsiveContainer>
      );
}
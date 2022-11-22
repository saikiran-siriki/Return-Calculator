import { useEffect } from "react";
import { useRouter } from "next/router";
import Graph from '../components/graph/graph'
import { CryptoClient } from '../api/crypto'
import Routes from '../services/crypto'
export default function Asset() {

    const router = useRouter()
    const {asset} = router.query
    console.log(asset)

    useEffect(() => {
      if(asset && asset!==undefined) {
        getPrices(asset)
      }
      
    }, [asset])

    async function getPrices(name: string) {
      const {getPricesFromTimeFrame} = Routes
      await CryptoClient.get(getPricesFromTimeFrame({name, interval: 'monthly'}))
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [111,202,-203,393,928,-209,-393],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
    return <>
        <Graph options={options} data={data}/>
    </>
}
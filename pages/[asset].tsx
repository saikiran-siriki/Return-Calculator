import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Graph from '../components/graph/graph'
import Calculator from '../components/calculator/calculator'
import { CryptoClient } from '../api/crypto'
import Routes from '../services/crypto'


function isValidQuery(query: string | string[] | undefined){
  // check the query properties
  return typeof (query) === 'string'
}


type Data = Array<Array<[number, number]>>

export default function Asset() {
    const [data, setData] = useState<Data>([])
    const router = useRouter()
    let { asset } = router.query
    
    useEffect(() => {
      if(isValidQuery(asset)) {
        getPrices(asset as string)
      }
    }, [asset])

    async function getPrices(name: string) {
      const {getPricesFromTimeFrame} = Routes
      const resp = await CryptoClient.get(getPricesFromTimeFrame({name, interval: 'daily'}))
      setData(resp.data.prices)
    }
    return <div className="asset_layout">
      <div className="graph_container">
        { data.length && <Graph data={data}/> }
      </div>
      <h2 className="calculator_heading">Return Calculator</h2>
      <div className="calculator_container">
        { data.length && <Calculator assetData={data}/> }
      </div>
       
       
    </div>
}
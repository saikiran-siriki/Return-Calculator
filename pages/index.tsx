import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Graph from "../components/graph/graph";
import AssetSelect from "../components/AssetSelect/AssetSelect";
import Calculator from "../components/calculator/calculator";
import axios from "axios";
import {isValidQuery} from '../utils/helpers'
import {PriceData} from '../interfaces/assets'

export default function Asset() {
  const [data, setData] = useState<PriceData>([]);
  const [allCoins, setAllCoins] = useState([])

  const router = useRouter();
  let { asset } = router.query;

  useEffect(() => {
    console.log(asset)
    console.log(router)
    if(router.asPath==='/') {
        const url = {
            pathname: router.pathname,
            query: { asset: 'bitcoin'}
          }
        router.push(url, undefined, { shallow: true })
    }
    if (isValidQuery(asset)) {
      getPrices(asset as string);
    }
  }, [asset]);

  useEffect(() => {
    getAllCoins()
  }, [])

  async function getPrices(name: string) {
    const resp = await axios.get(`api/${name}`);
    setData(resp.data);
  }

  async function getAllCoins() {
    const resp = await axios.get('api/allcoins')
    setAllCoins(resp.data)
  }

  return (
    <div className="asset_layout">
      {data.length>0 && (
        <>
        
          <div className="calculator_container">
          <h2 className="calculator_heading">Return Calculator</h2>
            <Calculator assetData={data} />
          </div>
          <div className="box_container">
            <AssetSelect assetData={allCoins}/>
            <div className="graph_container">
              <Graph data={data} />
            </div>
          </div>
          
        </>
      )}
    </div>
  );
}

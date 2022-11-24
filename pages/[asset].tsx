import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Graph from "../components/graph/graph";
import Calculator from "../components/calculator/calculator";
import Routes from "../services/crypto";
import axios from "axios";
import {isValidQuery} from '../utils/helpers'
import {PriceData} from '../interfaces/assets'

export default function Asset() {
  const [data, setData] = useState<PriceData>([]);
  const router = useRouter();
  let { asset } = router.query;

  useEffect(() => {
    if (isValidQuery(asset)) {
      getPrices(asset as string);
    }
  }, [asset]);

  async function getPrices(name: string) {
    const { getPricesFromTimeFrame } = Routes;
    const resp = await axios.get(`api/${name}`);
    setData(resp.data);
  }
  return (
    <div className="asset_layout">
      {data.length>0 && (
        <>
          <div className="graph_container">
            <Graph data={data} />
          </div>
          <h2 className="calculator_heading">Return Calculator</h2>
          <div className="calculator_container">
            <Calculator assetData={data} />
          </div>
        </>
      )}
    </div>
  );
}

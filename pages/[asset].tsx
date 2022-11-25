import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AssetSelect from "../components/AssetSelect/AssetSelect";
import Calculator from "../components/calculator/calculator";
import axios from "axios";
import { isValidQuery } from "../utils/helpers";
import { PriceData, AllCoins, CoinData } from "../interfaces/assets";
import IndexPage from "../components/IndexPage/IndexPage";
import dynamic from "next/dynamic";
const Graph = dynamic(() => import("../components/graph/graph"), {
  ssr: false,
});

export async function getStaticProps(context: any) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  
  const res = await axios.get(`https://www.dcadaily.com/api/${context.params.asset}`);
  const data = res.data;
  const resp = await axios.get("https://www.dcadaily.com/api/allcoins");
  const allCoins = resp.data;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data, allCoins
    },
    revalidate: 1800,
  };
}

export async function getStaticPaths(context: any) {
  try{
    const resp = await axios.get(`https://www.dcadaily.com/api/allcoins`);
  const paths = resp.data.map((item: CoinData)=>{
    return { params: { asset: item.id } }
  })
  return {
    paths: paths.slice(0,30), //limiting the static renders to first 30, this is to deal with the freetier api limit of Coingecko
    fallback: false, // can also be true or 'blocking'
  }
  } catch(e) {
    return {
      paths: [],
      fallback: false, // can also be true or 'blocking'
    }
  }
  
}

export default function Asset({ allCoins, data }: { allCoins: AllCoins, data: PriceData }) {

  interface MetaData {
    pnl: number,
    dcaTime: string,
    duration: string
  }

  const router = useRouter();
  let { asset } = router.query;
  const [metadata,setMetaData] = useState<MetaData>({pnl:0, dcaTime: "", duration: ""})

  function onCalculatorUpdate(res: MetaData) {
    setMetaData(res)
  }


  return ( <div className="asset_layout">
      {data.length > 0 && (
        <>
          { metadata.dcaTime && <IndexPage title={`DCA Daily - ${allCoins.filter(item=>item.id===asset)[0].name}`} description={`If you DCA into ${allCoins.filter(item=>item.id===asset)[0].name} ${metadata.dcaTime} for ${metadata.duration}, you make ${metadata.pnl>=0?'a profit of ':'a loss of '}${metadata.pnl}%`} image={allCoins.filter(item=>item.id===asset)[0].image}/> }
          <div className="calculator_container">
            <h2 className="calculator_heading">Return Calculator</h2>
            <Calculator assetData={data} onCalculatorUpdate={onCalculatorUpdate}/>
          </div>
          <div className="box_container">
            <AssetSelect assetData={allCoins} />
            <div className="graph_container">
              <Graph data={data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

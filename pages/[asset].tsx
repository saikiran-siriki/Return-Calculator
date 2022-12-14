import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AssetSelect from "../components/AssetSelect/AssetSelect";
import Calculator from "../components/calculator/calculator";
import axios from "axios";
import { calculatedPnl } from "../utils/helpers";
import { PriceData, AllCoins, CoinData } from "../interfaces/assets";
import IndexPage from "../components/IndexPage/IndexPage";
import dynamic from "next/dynamic";
import { defaultDCA, defaultInvestmentPeriod } from '..//utils/consts'
const Graph = dynamic(() => import("../components/graph/graph"), {
  ssr: false,
});

export async function getStaticProps(context: any) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  
  const res = await axios.get(`https://www.dcadaily.com/api/${context.params.asset}`);
  const data = res.data;
  const { pnl } = calculatedPnl(data, defaultDCA.filter(item=>item.active)[0].everyXDays, defaultInvestmentPeriod.filter(item=>item.active)[0].days, 1)
  const resp = await axios.get("https://www.dcadaily.com/api/allcoins");
  const allCoins = resp.data;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data, allCoins, pnl
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
    fallback: 'blocking', // can also be true or 'blocking'
  }
  } catch(e) {
    return {
      paths: [],
      fallback: true, // can also be true or 'blocking'
    }
  }
  
}

export default function Asset({ allCoins, data, pnl }: { allCoins: AllCoins, data: PriceData, pnl: number }) {


  const router = useRouter();
  let { asset } = router.query;
  asset = asset || allCoins[0].id


  return ( <div className="asset_layout">
      {data.length > 0 && (
        <>
          { <IndexPage title={`DCA Daily - ${allCoins.filter(item=>item.id===asset)[0].name}`} description={`If you DCA into ${allCoins.filter(item=>item.id===asset)[0].name} ${defaultDCA[0].meta} for ${defaultInvestmentPeriod[0].name}, you make ${pnl>=0?'a profit of ':'a loss of '}${pnl}%`} image={allCoins.filter(item=>item.id===asset)[0].image}/> }
          <div className="calculator_container">
            <h2 className="calculator_heading">Return Calculator</h2>
            <Calculator assetData={data}/>
          </div>
          <div className="box_container">
            <AssetSelect assetData={allCoins} asset={asset as string}/>
            <div className="graph_container">
              <Graph data={data} asset={asset as string}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

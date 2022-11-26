import Asset from './[asset]'
import { calculatedPnl } from "../utils/helpers";
import axios from "axios";
import { defaultDCA, defaultInvestmentPeriod } from '..//utils/consts'
import { PriceData, AllCoins, CoinData } from "../interfaces/assets";

export async function getStaticProps(context: any) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    
    const resp = await axios.get("https://www.dcadaily.com/api/allcoins");
    const allCoins = resp.data;

    const res = await axios.get(`https://www.dcadaily.com/api/${allCoins[0].id}`);
    const data = res.data;
    const { pnl } = calculatedPnl(data, defaultDCA.filter(item=>item.active)[0].everyXDays, defaultInvestmentPeriod.filter(item=>item.active)[0].days, 1)
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        data, allCoins, pnl
      },
      revalidate: 1800,
    };
  }
  
export default function Home({ allCoins, data, pnl }: { allCoins: AllCoins, data: PriceData, pnl: number }) {
    return (<Asset allCoins={allCoins} data={data} pnl={pnl}/>)
}


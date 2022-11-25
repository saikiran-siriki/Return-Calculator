// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {CryptoClient} from '../../api-client/crypto'
import Routes from '../../services/crypto'
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 600 });
import {CoinData} from '../../interfaces/assets'
type Data = {
    name: string
}

async function getCoins() {
    const { getAllCoinData } = Routes
    const resp = await CryptoClient.get(getAllCoinData)
    return resp.data.map((item: CoinData) => { return {id: item.id, image: item.image, current_price: item.current_price, name: item.name, symbol: item.symbol}})
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {asset} = req.query
    try {
        let allcoins = myCache.get('allcoins');
        if(allcoins===null || allcoins===undefined) {
            allcoins = await getCoins() 
            myCache.set('allcoins', allcoins, 3600)
        }
        res.status(200).json(allcoins)

    } catch(err) {
        console.log(err)
        res.status(500)
    }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {CryptoClient} from '../../api/crypto'
import Routes from '../../services/crypto'
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 600 });

type Data = {
  name: string
}

async function getPrices(name: string) {
    const {getPricesFromTimeFrame}  = Routes
    const resp = await CryptoClient.get(getPricesFromTimeFrame({name, interval: 'daily'}))
    return resp.data.prices
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {asset} = req.query
    try {
        let prices = myCache.get(asset);
        if(prices===null || prices===undefined) {
            prices = await getPrices(asset as string) 
            myCache.set(asset, prices, 600)
        }
        res.status(200).json(prices)

    } catch(err) {
        console.log(err)
        res.status(500)
    }
}

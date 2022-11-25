export type PriceData = Array<Array<number>>;

export interface CoinData {
    id: string,
    image: string,
    current_price: number,
    name: string,
    symbol: string
}
export type AllCoins = Array<CoinData>
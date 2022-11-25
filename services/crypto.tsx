const Routes = {
    getPricesFromTimeFrame: ({name, interval}: {name: string, interval: string} )=> `${name}/market_chart?vs_currency=USD&days=max&interval=${interval}`,
    getAllCoinData: `/markets?vs_currency=usd&order=market_cap_desc&per_page=250&limit=250`
}

export default Routes;
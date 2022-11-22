const Routes = {
    getPricesFromTimeFrame: ({name, interval}: {name: string, interval: string} )=> `${name}/market_chart?vs_currency=USD&days=max&interval=${interval}`
}

export default Routes;
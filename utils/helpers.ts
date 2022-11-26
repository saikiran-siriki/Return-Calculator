export function isValidQuery(query: string | string[] | undefined) {
    // check the query properties
    return typeof query === "string";
}

export function calculatedPnl(assetData: Array<Array<number>>, dcaCycleDays: number, investmentDurationDays: number, amountPerCycle: number) {
    const filteredAssetDataArr = assetData.slice(assetData.length-investmentDurationDays, assetData.length)
    const todayAsssetValue = (assetData.at(-1) as number[])[1]
    const totalAccumulatedAssets = filteredAssetDataArr.reduce((a, b, index: number)=>{if(index%dcaCycleDays===0) {return a+(amountPerCycle/b[1])} else {return a}},0)
    const currentPortfolioValue = Number((totalAccumulatedAssets*todayAsssetValue).toFixed(2))

    const totalInvestedSoFar = Math.floor(amountPerCycle*investmentDurationDays/dcaCycleDays)
    const pnl = Number(((currentPortfolioValue-totalInvestedSoFar)*100/totalInvestedSoFar).toFixed(2))
    return {
        pnl,
        currentPortfolioValue,
        totalInvestedSoFar
    }
}
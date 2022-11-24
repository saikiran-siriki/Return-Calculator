import {useEffect, useState} from 'react'
import Tabs from '../tabs/tabs'
import Slider from '../rangeslider/rangeslider'
import styles from './calculator.module.scss'

interface TabItem  {
    name: string,
    active: Boolean,
    title: string
}
type TabItems = Array<TabItem>
export default function Calculator({assetData}: {assetData: Array<Array<number>>}) {
    const [dcaTime, setDcaTime] = useState([{name: 'Daily DCA', active: true, title:'Day', everyXDays: 1},{name: 'Weekly DCA', active: false, title:'Week', everyXDays: 7},{name: 'Monthly DCA', active: false, title:'Month', everyXDays: 30},])
    const [duration, setDuration] = useState([{name: '1 Year', active: true, days: 365},{name: '2 Years', active: false, days: 730},{name: '3 Years', active: false, days: 1095},{name: '4 Years', active: false, days: 1460},{name: '5 Years', active: false, days: 1825}])
    const [investmentPerTimeFrame, setInvestmentPerTimeFrame] = useState(1)
    const [totalInvestment, setTotalInvestment] = useState<number>(0)
    const [portfolioValue, setPortfolioValue] = useState<number>(0)

    useEffect(()=>{
        const filteredDurationDays = duration.filter(item=>item.active)[0].days
        const filteredDcaDays = dcaTime.filter(item=>item.active)[0].everyXDays
        const filteredAssetDataArr = assetData.slice(assetData.length-filteredDurationDays, assetData.length)
        const todayAsssetArr = assetData.at(-1) as number[]
        const todayAsssetValue = todayAsssetArr[1]
        const filteredAssetAccumulatedVal = filteredAssetDataArr.reduce((a, b, index: number)=>{if(index%filteredDcaDays===0) {return a+(investmentPerTimeFrame/b[1])} else {return a}},0)
        setPortfolioValue(Number((filteredAssetAccumulatedVal*todayAsssetValue).toFixed(2)))

        const totalInvested = Math.floor(investmentPerTimeFrame*filteredDurationDays/filteredDcaDays)
        setTotalInvestment(totalInvested)
    }, [dcaTime,duration,investmentPerTimeFrame, assetData])
    

    function onSelectTab(i: number, items: TabItems, setItems: Function) {
        const newTabs = items.map((tab, index) => {
            return {...tab, active: index===i}
        })
        setItems(newTabs)
    }

    function onSliderChange(e: React.SyntheticEvent | Event, value: number | Array<number>) {
        setInvestmentPerTimeFrame(Number(value))
    }

    function displayProfitLoss() {
        const PnL = Number(((portfolioValue-totalInvestment)*100/totalInvestment).toFixed(2))
        return <span className={`${PnL>=0?styles.profit:styles.loss}`}>({PnL})%</span>
    }

    return (<>
        <Tabs tabs={dcaTime} onSelectTab={onSelectTab} items={dcaTime} setEvent={setDcaTime}/>
        <h4>${investmentPerTimeFrame} per {dcaTime.filter(item=>item.active)[0].title}</h4>
        <div className={styles.slider_container}>
            <Slider defaultValue={1} aria-label="Default" valueLabelDisplay="auto" onChangeCommitted={onSliderChange} max={1000} min={5} step={10} color="success" marks />
        </div>
       
        <h5 className={styles.heading}>Over the past</h5>
        <Tabs tabs={duration} onSelectTab={onSelectTab} items={duration} setEvent={setDuration}/>
        <hr />
        <h4>Total investment of ${totalInvestment}</h4>
        <h3>Would have become ${portfolioValue} {displayProfitLoss()}</h3>

    </>
    )
}
import {useEffect, useState} from 'react'
import Tabs from '../tabs/tabs'
import Slider from '../rangeslider/rangeslider'
import styles from './calculator.module.scss'
import {TabItems} from '../../interfaces/calculator'
import { defaultDCA, defaultInvestmentPeriod } from '../../utils/consts'
import { calculatedPnl } from '../../utils/helpers'



export default function Calculator({assetData}: {assetData: Array<Array<number>>}) {
    const [dcaTime, setDcaTime] = useState(defaultDCA)
    const [duration, setDuration] = useState(defaultInvestmentPeriod)
    const [investmentPerTimeFrame, setInvestmentPerTimeFrame] = useState(1)
    const [totalInvestment, setTotalInvestment] = useState<number>(0)
    const [portfolioValue, setPortfolioValue] = useState<number>(0)
    const [PnL, setPnl] = useState<number>(0)

    useEffect(()=>{
        const dcaCycleDays = dcaTime.filter(item=>item.active)[0].everyXDays
        const investmentDurationDays = duration.filter(item=>item.active)[0].days
        const { pnl, currentPortfolioValue, totalInvestedSoFar} = calculatedPnl(assetData, dcaCycleDays,investmentDurationDays, investmentPerTimeFrame)
        setPortfolioValue(currentPortfolioValue)
        setTotalInvestment(totalInvestedSoFar)
        setPnl(pnl)
       
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
        <h3>Would have become ${portfolioValue} <span className={`${PnL>=0?styles.profit:styles.loss}`}>({PnL})%</span></h3>

    </>
    )
}
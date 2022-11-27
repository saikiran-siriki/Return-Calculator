import {useEffect, useState} from 'react'
import Tabs from '../tabs/tabs'
import Slider from '../rangeslider/rangeslider'
import styles from './calculator.module.scss'
import {TabItems} from '../../interfaces/calculator'
import { defaultDCA, defaultInvestmentPeriod } from '../../utils/consts'
import { calculatedPnl } from '../../utils/helpers'

import type { RootState } from '../../state/store'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentPortfolioValue, updateTotalInvestment } from '../../state/slices/calculatorSlice'



export default function Calculator({assetData}: {assetData: Array<Array<number>>}) {
    const totalInvestedSoFar = useSelector((state: RootState) => state.calculator.totalInvestedSoFar)
    const currentPortfolioValue = useSelector((state: RootState) => state.calculator.currentPortfolioValue)
    const dispatch = useDispatch()



    const [dcaTime, setDcaTime] = useState(defaultDCA)
    const [duration, setDuration] = useState(defaultInvestmentPeriod)
    const [investmentPerTimeFrame, setInvestmentPerTimeFrame] = useState(1)
    const [PnL, setPnl] = useState<number>(0)

    useEffect(()=>{
        const dcaCycleDays = dcaTime.filter(item=>item.active)[0].everyXDays
        const investmentDurationDays = duration.filter(item=>item.active)[0].days
        const { pnl, currentPortfolioValue: currenValue, totalInvestedSoFar: totalValue} = calculatedPnl(assetData, dcaCycleDays,investmentDurationDays, investmentPerTimeFrame)
        dispatch(updateTotalInvestment(totalValue))
        dispatch(updateCurrentPortfolioValue(currenValue))
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
        <p className='weight500'>${investmentPerTimeFrame} per {dcaTime.filter(item=>item.active)[0].title}</p>
        <div className={styles.slider_container}>
            <Slider defaultValue={1} aria-label="Default" valueLabelDisplay="auto" onChangeCommitted={onSliderChange} max={1000} min={5} step={10} color="success" marks />
        </div>
       
        <h5 className={styles.heading}>Over the past</h5>
        <Tabs tabs={duration} onSelectTab={onSelectTab} items={duration} setEvent={setDuration}/>
        <hr />
        <p className='weight500'>Total investment of ${totalInvestedSoFar}</p>
        <h3 className='weight600'>Would have become ${currentPortfolioValue} <span className={`${PnL>=0?styles.profit:styles.loss}`}>({PnL})%</span></h3>

    </>
    )
}
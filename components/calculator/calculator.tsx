import {useState} from 'react'
import Tabs from '../tabs/tabs'
import Slider from '../rangeslider/rangeslider'
import styles from './calculator.module.scss'

interface TabItem  {
    name: string,
    active: Boolean
}
type TabItems = Array<TabItem>
export default function Graph() {
    const [dcaTime, setDcaTime] = useState([{name: 'Daily DCA', active: true},{name: 'Weekly DCA', active: false},{name: 'Monthly DCA', active: false},])
    const [duration, setDuration] = useState([{name: '1 Year', active: true},{name: '2 Year', active: false},{name: '3 Year', active: false}])

    

    function onSelectTab(i: number, items: TabItems, setItems: Function) {
        const newTabs = items.map((tab, index) => {
            return {...tab, active: index===i}
        })
        setItems(newTabs)
    }

    return (<>
        <Tabs tabs={dcaTime} onSelectTab={onSelectTab} items={dcaTime} setEvent={setDcaTime}/>
        <div className={styles.slider_container}>
            <Slider/>
        </div>
       
        <h3 className={styles.heading}>Over the past</h3>
        <Tabs tabs={duration} onSelectTab={onSelectTab} items={duration} setEvent={setDuration}/>
    </>
    )
}
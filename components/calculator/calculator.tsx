import {useState} from 'react'
import Tabs from '../tabs/tabs'
export default function Graph() {
    const [tabs, setTabs] = useState([{name: 'Daily', active: true},{name: 'Weekly', active: false},{name: 'Monthly', active: false},])

    function onSelectTab(i: number) {
        const newTabs = tabs.map((tab, index) => {
            return {...tab, active: index===i}
        })
        setTabs(newTabs)
    }
    return <>
        <Tabs tabs={tabs} onSelectTab={onSelectTab}/>
    </>
}
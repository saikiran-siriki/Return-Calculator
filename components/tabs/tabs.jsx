import styles from './tabs.module.scss'
export default function Tabs({tabs, onSelectTab, items, setEvent}) {
    return (
        <ul className={styles.tabs}>
            {tabs.length && 
                tabs.map(({name, active}, index)=> {
                    return <li className={`${styles.tabs__item} ${active?styles.tabs__active:''}`} key={index} onClick={()=>onSelectTab(index, items, setEvent)}>{ name }</li>
                })
            }
        </ul>
    )
}
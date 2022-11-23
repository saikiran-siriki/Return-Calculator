import styles from './tabs.module.css'
export default function Tabs({tabs, onSelectTab}) {
    return (
        <ul className={styles.tabs}>
            {tabs.length && 
                tabs.map(({name, active}, index)=> {
                    return <li className={`tab-item ${active?'is-active':''}`} key={index} onClick={()=>onSelectTab(index)}>{ name }</li>
                })
            }
        </ul>
    )
}
import './index.scss'
import {useState} from "react";
import MyNavBar from '@/components/MyNavBar'
 import CollapseItem from "@/pages/Month/components/CollapseItem/index.jsx";
import TopCard from "@/pages/Month/components/TopCard/index.jsx";
import axios from '@/utils/request'

export default function Month() {
const [monthList,setMonthList] =useState([])
    return (
        <div style={{height:'100%'}}>
            <MyNavBar title={'月度收支'}></MyNavBar>
            <div className={'month-content'}>
                <TopCard sendMonthList={(v)=>setMonthList(v)}></TopCard>
                <CollapseItem monthList={monthList}></CollapseItem>
            </div>
        </div>

    )
}

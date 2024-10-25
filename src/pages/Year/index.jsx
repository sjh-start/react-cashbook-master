import './index.scss'
import {useState, useEffect} from "react";
import dayjs from 'dayjs'
import {autorun} from 'mobx'
import DataSelect from "@/pages/Year/components/DataSelect/index.jsx";
import List from "@/pages/Year/components/List/index.jsx";
import useSameDate from "@/hooks/useSameDate.js";
import usePayIncome from "@/hooks/usePayIncome.js";
import store from '@/store/index'

export default function Year() {
    const [timeValue, setTimeValue] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    const [yearList, setYearList] = useState([])
    useEffect(() => {

        store.getList()
    }, [])
    useEffect(() => {

        autorun(() => {
            getYearList()
        })

    }, [timeValue])
    //获得某一年的数据
    const getYearList = () => {
        if (store.list.length > 0) {
            let list = useSameDate(store.list, 'year')
            let isSame = list.some(v => {
                if (dayjs(v.date).isSame(timeValue, 'year')) {
                    setYearList(v.list)
                    return true
                }
            })
            if (!isSame) {
                //没有对于年账单
                setYearList([])
            }
        }

    }
    return (
        <div className={'year-content'}>
            <DataSelect sendTime={(v) => setTimeValue(v)}></DataSelect>
            {yearList.length>0&&<div className={'row'}>
                <div className={'item'}>
                    <span className={'num'}>
                        {usePayIncome(yearList).pay}
                    </span>
                    <span>支出</span>
                </div>
                <div className={'item'}>
                    <span className={'num'}>
                       {usePayIncome(yearList).income}
                    </span>
                    <span>收入</span>
                </div>
                <div className={'item'}>
                    <span className={'num'}>
                        {usePayIncome(yearList).balance}
                    </span>
                    <span>结余</span>
                </div>
            </div>}
            <List yearList={yearList}></List>
        </div>
    )
}

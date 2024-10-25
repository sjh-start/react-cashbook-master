import './index.scss'
import {useState, useEffect} from "react";
import usePayIncome from "@/hooks/usePayIncome.js";
import dayjs from 'dayjs'
import { Empty} from 'antd-mobile'

import useSameDate from "@/hooks/useSameDate.js";

export default function List({yearList}) {
    const [monthList, setMonthList] = useState([]) //时间按月份分类
    useEffect(() => {
            //时间按月份分类
            let list = useSameDate(yearList, 'month')
            setMonthList(list)
    }, [yearList])
    return (
        <div className={'list-content'}>
            {monthList.length > 0 && monthList.map((v, i) =>
                <div className={'card'} key={i}>
                    <span>{dayjs(v.date).format('M')}月</span>
                    <div className={'num'}>
                        <div className={'item'}>
                            <span style={{color: '#e07588'}}>支出</span>
                            <span> {usePayIncome(v.list).pay}</span>
                        </div>
                        <div className={'item'}>
                            <span style={{color: '#417b6c'}}>收入</span>
                            <span> {usePayIncome(v.list).income}</span>
                        </div>
                        <div className={'item'}>
                            <span style={{fontSize: '18px', marginBottom: '3px'}}>{usePayIncome(v.list).balance}</span>
                            <span> 结余</span>
                        </div>
                    </div>
                </div>)}
            {/*无数据*/}
            {monthList.length === 0 &&
                <Empty
                    style={{padding: '64px 0'}}
                    imageStyle={{width: 80}}
                    description='暂无记录 '
                />
            }
            {/*数组长度大于等于6时出现*/}
            <div style={{height: '52px'}}></div>

        </div>
    )
}

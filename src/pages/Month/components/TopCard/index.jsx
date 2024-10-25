import './index.scss'
import {useState, useEffect} from "react";
import Bg from '@/assets/image/统计.png'
import axios from '@/utils/request'
import Icon from '@/components/Icon'
import MyDatePicker from "@/components/MyDatePicker/index.jsx";
import dayjs from 'dayjs'
import store from '@/store/index'
import {autorun} from 'mobx'
import usePayIncome from '@/hooks/usePayIncome'

export default function TopCard({sendMonthList}) {
    const [pickerVisible, setPickerVisible] = useState(false)
    const [timeValue, setTimeValue] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    const [monthList, setMonthList] = useState([])
    useEffect(() => {
        store.getList()
        autorun(() => {
            //在autorun中加一句这个条件很重要
            if (store.list.length > 0&&timeValue) {
                getMonthList()
            }
        })
    }, [timeValue])
    //获取当月列表
    const getMonthList = () => {
        let currentMonth = dayjs(timeValue).format("YYYY-MM") //当月
        let arr = []
        store.list.forEach(v => {
            if (v.date.indexOf(currentMonth) === 0) {
                arr.push(v)
            }
        })
        sendMonthList(arr)
        setMonthList(arr)
    }

    const timeChange = (v) => {
        setTimeValue(v)
    }
    return (
        <div className={'topCard-content'}>
            <img className={'bg'} src={Bg} alt=""/>
            <div className={'content'}>
                <div className={'time'} onClick={() => {
                    setPickerVisible(!pickerVisible)
                }}>
                    <span>{dayjs(timeValue).year()} | {dayjs(timeValue).month() + 1}月账单</span>
                    <Icon type={'icon-xiala1'}></Icon>
                    <MyDatePicker
                        precision={'month'}
                        sendValue={(v) => timeChange(v)}
                        onClose={() => setPickerVisible(false)}
                        pickerVisible={pickerVisible}>
                    </MyDatePicker>
                </div>
                <div className={'detail'}>
                    <div className={'item'}>
                        <span>{usePayIncome(monthList).pay}</span>
                        <span className={'text'}>支出</span>
                    </div>
                    <div className={'item'}>
                        <span>{usePayIncome(monthList).income}</span>
                        <span className={'text'}>收入</span>
                    </div>
                    <div className={'item'}>
                        <span>{usePayIncome(monthList).balance}</span>
                        <span className={'text'}>结余</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

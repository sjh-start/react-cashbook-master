import './index.scss'
import {useState, useEffect} from "react";
import {Input} from 'antd-mobile'
import Icon from '@/components/Icon'
import isToday from 'dayjs/plugin/isToday'
import MyDatePicker from "@/components/MyDatePicker/index.jsx";
import classnames from 'classnames'
import dayjs from 'dayjs'

export default function TopIpt({sendType, sendIptValue, sendTimeValue,reset}) {
    const [pickerVisible, setPickerVisible] = useState(false) //时间选择器
    const [timeValue, setTimeValue] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss')) //选的时间
    const [iptValue, setIptValue] = useState('') //表单值
    const [type, setType] = useState('pay') //支出还是收入
    dayjs.extend(isToday)
    useEffect(()=>{
        //重置表单
        if(reset){
            setIptValue('')
        }
    },[reset])
    const changeType = (v) => {
        setType(v)
        sendType(v)
    }
    return (
        <div className={'topIpt-content'}>
            <div className={'btn-bar'}>
                <button onClick={() => changeType('pay')} className={classnames({active: type === 'pay'})}>支出</button>
                <button onClick={() => changeType('income')} className={classnames({active: type === 'income'})}>收入
                </button>
            </div>
            <div className={'ipt-box'}>
                <div className={'date-picker'}
                     onClick={() => {
                         setPickerVisible(!pickerVisible)
                     }}>
                    <MyDatePicker
                        precision={'day'}
                        sendValue={(v) => {
                            setTimeValue(v)
                            sendTimeValue(v)
                        }}
                        onClose={() => setPickerVisible(false)}
                        pickerVisible={pickerVisible}>
                    </MyDatePicker>
                    <Icon type={'icon-riqi'}></Icon>
                    <span
                        className={'text'}>{dayjs(timeValue).isToday() ? '今天' : dayjs(timeValue).format('YYYY-MM-DD')}</span>
                </div>

                <div className={'right-box'}>
                    <Input
                        type={'number'}
                        placeholder='0.00'
                        value={iptValue}
                        onChange={val => {
                            setIptValue(val)
                            sendIptValue(val)
                        }}
                    />
                    <span style={{marginLeft: '5px'}}>￥</span></div>

            </div>

        </div>
    )
}

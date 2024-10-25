import './index.scss'
import {useState} from "react";
import dayjs from 'dayjs'
import Icon from '@/components/Icon'
import MyDatePicker from '@/components/MyDatePicker'

export default function DataSelect({sendTime}) {
    const [pickerVisible, setPickerVisible] = useState(false)
    const [timeValue, setTimeValue] = useState(dayjs(new Date).format('YYYY-MM-DD HH:mm:ss'))
    return (
        <div className={'select-content'}
             onClick={() => {
                 setPickerVisible(!pickerVisible)
             }}>
            <MyDatePicker
                precision={'year'}
                sendValue={(v) => {
                    setTimeValue(v)
                    sendTime(v)

                }}
                onClose={() => setPickerVisible(false)}
                pickerVisible={pickerVisible}>
            </MyDatePicker>
            <span>{dayjs(timeValue).format('YYYY')}年 </span>
            <Icon type={'icon-xiala1'}></Icon>
        </div>
    )
}

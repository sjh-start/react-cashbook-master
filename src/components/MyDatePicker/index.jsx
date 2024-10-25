 import './index.scss'
import {useState} from "react";
import dayjs from 'dayjs'

import {DatePicker} from 'antd-mobile'
import {useEffect} from 'react'

export default function MyDatePicker({pickerVisible = false, onClose,sendValue,precision='month'}) {
    const [visible, setVisible] = useState(pickerVisible)
    const now = new Date()  //最大可选时间
    const min = new Date(dayjs().subtract(4, 'year').format()) //最小可选时间4年前
    useEffect(() => {
        setVisible(pickerVisible)
    })
    const pickerConfirm=(v)=>{
        sendValue(dayjs(v).format('YYYY-MM-DD HH:mm:ss'))
    }
    return (
        <>
            <DatePicker
                title='时间选择'
                precision={precision}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                    onClose()
                }}
                min={min}
                max={now}
                onConfirm={pickerConfirm}
            >
            </DatePicker>
        </>
    )
}

import './index.scss'
import {useState, useEffect} from "react";
import MyNavBar from '@/components/MyNavBar'
import TopIpt from './components/TopIpt'
import MoneyType from "@/pages/Add/components/MoneyType/index.jsx";
import dayjs from 'dayjs'
import {autorun} from 'mobx'
import {Modal,} from 'antd-mobile'
import store from "@/store/index.js";
import axios from '@/utils/request'

export default function Add() {
    const [type, setType] = useState('pay')
    const [reset, setReset] = useState(false)
    const [addParams, setAddParams] = useState({
        type: 'pay',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss')
    })
    const sendType = (v) => {
        setAddParams({...addParams, type: v})
        setType(v)
    }
    const resetParams = () => {
        setAddParams({
        ...addParams,
            money:'',
            useFor:''
        })
    }
    //提交按钮
    const handleSubmit = () => {
        if (addParams?.useFor && addParams?.money&&addParams?.money!=0) {
            setAddParams({...addParams, id: store.list.length + 1})
            axios({
                method: 'post',
                url: '/list',
                data: {
                    ...addParams
                }
            }).then(res => {
                store.getList()
                setReset(true)
                resetParams()
                setTimeout(() => {
                    setReset(false)
                }, 100)
                Modal.show({
                    content: '添加成功！',
                    closeOnAction: true,
                    actions: [
                        {
                            text: '确定',
                            primary: true,
                            key: '1'
                        },

                    ],
                })
            })

        } else {
            //数据未完善
            Modal.show({
                content: '提示：' + (addParams?.useFor ? '请输入数额' : '请选择种类'),
                closeOnAction: true,
                actions: [
                    {
                        text: '确定',
                        primary: true,
                        key: '1'
                    },

                ],
            })
        }
    }
    useEffect(() => {
        //type变化。清空usefor
        if (type) {
            setAddParams({...addParams, useFor: ''})
        }
    }, [type])
    return (
        <div className={'add-content'}>
            <MyNavBar title={'记一笔'}></MyNavBar>
            <TopIpt
                reset={reset}
                sendIptValue={(v) => setAddParams({...addParams, money: v})}
                sendTimeValue={(v) => setAddParams({...addParams, date: v})}
                sendType={(v) => sendType(v)}>
            </TopIpt>
            <MoneyType
                reset={reset}
                sendSubmit={handleSubmit}
                sendUseFor={(v) => setAddParams({...addParams, useFor: v})}
                type={type}>
            </MoneyType>
        </div>
    )
}

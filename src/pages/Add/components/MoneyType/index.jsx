import './index.scss'
import {useState,useEffect} from "react";
import {autorun} from 'mobx'
import {Button} from 'antd-mobile'
import Icon from '@/components/Icon'
import data from '@/pages/Add/components/TopIpt/data.json'
import classnames from 'classnames'

const List = ({list,sendUseFor,type,reset}) => {
    const [selected, setSelected] = useState('')
    const handleSelected =(v)=>{
        setSelected(v)
        sendUseFor(v)
    }
    useEffect(()=>{
        //重置选择
        if(reset){
            setSelected('')
        }
    },[reset])
    useEffect(()=>{
        //type变化。清空usefor
        autorun(()=>{if(type){
            setSelected('')
        }})
    },[type])
    return (
        <div>
            {list.map(v => <div key={v.type} className={'type'}>
                <span> {v.type}</span>
                <div className={'row'}>
                    {v.list.map(v2 =>
                        <div
                            onClick={()=>handleSelected(v2.value)}
                            key={v2.value}
                            className={classnames({
                                item: true,
                                active: selected === v2.value
                            })}>
                            <Icon type={v2.icon}></Icon>
                            <span>{v2.label}</span>
                        </div>)}
                </div>
            </div>)}</div>)

}

export default function MoneyType({type,sendUseFor,sendSubmit,reset}) {

    return (
        <div className={'type-content'}>
            <Button onClick={sendSubmit} className={'save'}>保存</Button>
            <List
                reset={reset}
                type={type}
                sendUseFor={(v)=>sendUseFor(v)}
                list={type === 'pay' ? data.pay : data.income}></List>
        </div>
    )
}

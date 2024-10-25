import './index.scss'
import {useState, useEffect} from "react";
import {Collapse, Empty} from 'antd-mobile'
import classnames from 'classnames';
import Icon from '@/components/Icon'
import dayjs from 'dayjs'
import useSameDate from '@/hooks/useSameDate'
import BigNumber from 'bignumber.js'
import useForDic from '@/pages/Add/components/TopIpt/data.json'
import store from '@/store/index'
import usePayIncome from "@/hooks/usePayIncome.js";
//折叠面板头部
const Panel = ({show, row}) => {
    return (<div className={'panel'}>
        <div className={'date'}>
            <span>{dayjs(row.date).format('MM月DD日')}</span>
            <div className={'icon-box'}>
                <div className={classnames({
                    'icon-xiala': true,
                    'unfold': !show
                })}>
                    <Icon type={'icon-xiala'}></Icon></div>
            </div>
        </div>
        <div className={'num'}>
            <div className={'item'}>
                <span style={{color: '#e07588'}}>支出</span>
                <span> {usePayIncome(row.list).pay}</span>
            </div>
            <div className={'item'}>
                <span style={{color: '#417b6c'}}>收入</span>
                <span> {usePayIncome(row.list).income}</span>
            </div>
            <div className={'item'}>
                <span style={{fontSize: '18px'}}>{usePayIncome(row.list).balance}</span>
                <span> 结余</span>
            </div>

        </div>
    </div>)
}
export default function CollapseItem({monthList}) {
    const [show, setShow] = useState(false)
    const [dayList, setDayList] = useState({})
    const [useFor, setUseFor] = useState([])
    useEffect(() => {
        if (monthList) {
            getDayList()
        }
    }, [monthList])


    //把同一日分类到一起
    const getDayList = () => {
        //当日数据分类 dayList
        let arr = useSameDate(monthList, 'day')
        setDayList(arr)
    }
    //获得具体花销中文名与图标
    const getUseForLabel = (row) => {
        let obj = {}
        useForDic[row.type].some(v => {
            return v.list.some(v2 => {
                if (v2.value === row.useFor) {
                    obj.icon = v2.icon
                    obj.label = v2.label
                    return true
                }
            })
        })
        return obj
    }
    //当日花销明细
    const dayUseFor = (list) => {
        let arr = []
        if (list.length > 0) {
            list.forEach((v, i) => {
                let item = {
                    id: arr.length + 1,
                    type: v.type,
                    useFor: v.useFor,
                    totalMoney: v.money,
                    ...getUseForLabel(v) //拼接icon与label信息
                }
                if (arr.length === 0) {
                    arr.push(item)
                    getUseForLabel(arr[0])
                } else {
                    let isSame = arr.some((v2) => {
                        //已存在的明细种类。叠加数额
                        if (v2.useFor === v.useFor) {
                            v2.totalMoney = BigNumber(v2.totalMoney).plus(v.money).toString()
                            return true
                        }
                    })
                    if (!isSame) {
                        //需要添加该类型
                        arr.push(item)
                    }
                }
            })
        }
        return arr
    }
    return (
        <div className={'collapseItem-content'}>
            {dayList.length > 0 && dayList.map(v => < Collapse key={v.id} defaultActiveKey={['1']}>
                <Collapse.Panel onClick={() => {
                    setShow(!show)
                }} key='1' arrowIcon={<Panel row={v} show={show}></Panel>}>
                    <div className={'content'}>

                        {v.list.length > 0 && dayUseFor(v.list).map(item =>
                            <div
                                key={item.id}
                                className={'detail-item'}>
                                {/*{useForLabel(item)}*/}
                                <div className={'row'}>
                                    <Icon type={item.icon}></Icon>
                                    <span className={'text'}>{item.label}</span>
                                </div>
                                <span className={'right'}>{item.type === 'income' ? '+' : '-'}{item.totalMoney}</span>
                            </div>)}
                    </div>
                </Collapse.Panel>
            </Collapse>)}
            {/*无数据*/}
            {dayList.length === 0 &&
                <Empty
                    style={{padding: '64px 0'}}
                    imageStyle={{width: 80}}
                    description='暂无记录 '
                />
            }
        </div>
    )
}

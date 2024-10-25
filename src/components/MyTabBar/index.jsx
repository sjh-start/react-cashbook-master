import './index.scss'
import {useState} from "react";

import {useNavigate} from 'react-router-dom'
import {TabBar,} from 'antd-mobile'
import Icon from '@/components/Icon'

export default function MyTabBar() {

    const navigate = useNavigate()
    const {pathname} = location //​ Location 对象包含有关当前 URL 的信息
    const tabs = [
        {
            key: '/',  //直接与路由匹配
            title: '月度收支',
            icon: <Icon type={'icon-qianbao1'}/>
        },
        {
            key: '/add',
            title: '记账',
            icon: <Icon type={'icon-jizhang'}/>

        },
        {
            key: '/year',
            title: '年度账单',
            icon: <Icon type={'icon-danzi'}/>
        },

    ]

    const setRouteActive = (value) => {

        navigate( value)
    }
    return (
        <div>

            <div style={{height: '52px' ,position:'reactive',bottom:'0px'}}></div>
            <div className={'fixed'}>

                <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                    ))}
                </TabBar>
            </div>
        </div>

    )
}

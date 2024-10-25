import {useEffect} from "react";
import {Outlet} from 'react-router-dom'

import MyTabBar from "@/components/MyTabBar/index.jsx";
import './index.scss'

const Home = () => {
    return (
        <div className={'home-content'}>
            {/*类似于router-view*/}

            <Outlet></Outlet>
            <MyTabBar></MyTabBar>
        </div>
    )
}
export default Home
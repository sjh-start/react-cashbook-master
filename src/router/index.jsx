import {createBrowserRouter} from 'react-router-dom';
import Home from '@/pages/Home'
import Month from "@/pages/Month/index.jsx";
import Add from "@/pages/Add/index.jsx";
import Year from '@/pages/Year'
const router = createBrowserRouter([
    {
        path:'/',
        element: <Home/>,
        children: [{
            index:true,
            element:<Month/>
        },{
            path:'/add',
            element: <Add/>
        },{
            path:'/year',
            element: <Year/>
        }]
    }
])
export default router
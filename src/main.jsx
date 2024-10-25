import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './base.css'
import '@/assets/icon/iconfont.css'
import router from '@/router/index'
import {RouterProvider} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)

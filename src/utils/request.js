import axios from 'axios'
//配置请求的基础url以及响应超时时间
axios.defaults.baseURL = 'http://localhost:8888'
axios.defaults.timeout = 30 * 1000
//请求拦截器，在请求头里添加TOKEN
axios.interceptors.request.use(config => {
        return config
    },
    //参数二，对错误请求做什么
    error => {
        console.log('请求出错，错误是' + error)
        //返回一个失败状态promise
        return Promise.reject(error)
    },
)

// 一定要返回实例
export default axios
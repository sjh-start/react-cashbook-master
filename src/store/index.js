import {makeAutoObservable} from "mobx";
import axios from '@/utils/request'
import useSortDate from "@/hooks/useSortDate.js";
class Store {
    // 数值状态
    list = []//账单列表
    constructor() {
        // 将参数对象中的属性设置为 observable state
        // 将参数对象中的方法设置为 action
        makeAutoObservable(this);
    }

    getList = () => {
        axios.get('/list').then(res => {
            this.list = res.data.sort(useSortDate('date'))
        })
    }

}

const store = new Store
export default store;

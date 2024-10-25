import BigNumber from 'bignumber.js'

//获得支出、收入、结余数据
const usePayIncome = (arr) => {
    //因为js计算不准确，用第三方库BigNumber
    let obj = {
        pay: 0,
        income: 0,
        balance: 0
    }
    if (arr?.length > 0) {
        arr.forEach(v => {
            if (v.type === 'pay') {
                obj.pay = BigNumber(obj.pay).plus(v.money).toString()
            } else if (v.type === 'income') {
                obj.income = BigNumber(obj.income).plus(v.money).toString()
            }
            obj.balance = BigNumber(obj.income).minus(obj.pay).toString()
        })

    }
    return obj
}
export default usePayIncome
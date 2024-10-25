//判断是否为同一个日期 .type:day||month||year
import dayjs from 'dayjs'
import useSortDate from "@/hooks/useSortDate";

function useSameDate(list, type) { let arr = []
    if (list?.length > 0) {

        list.forEach((v,i) => {
            if (arr.length > 0) {
                let isSame = arr.some(v2 => {
                    if (dayjs(v.date).isSame(v2.date, type)) {
                        v2.list.push(v)
                        return true
                    }
                })
                if (!isSame) {
                    //是需要新加入的日期
                    arr.push({
                        date: dayjs(v.date).format('YYYY-MM-DD HH:mm:ss'),
                        list: [v],
                        id:i+1
                    })
                }

            } else {
                //第一次循环list
                arr.push({
                    date: dayjs(v.date).format('YYYY-MM-DD HH:mm:ss'),
                    list: [v],
                    id:1
                })
            }
        })

    }
    return arr
}

export default useSameDate
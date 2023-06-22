

export const complete = function (entries, setList) {
    // console.log(entries)
    let list = []
    for (const [idx, [key, val]] of Object?.entries(Object?.entries(entries.pass))) {

        
        for (let j = 0; j < val.length; j++) {
            
            if (list?.length == val?.length) {
                list[j] = (list[j]+(val[j]?.close * entries.obj[key]?.qty  ))
            } else {
                list.push(val[j]?.close)
            }
        }
    }
    
    list.reverse()
    setList(list)  

    return entries
}

// var complete = function(entries) {
//     let list = []

//     for (const [key,val] of Object.entries(entries)) {
//         list.push(val)
//         // for (let j = 0; j < val.length; j++) {
//         //     temp.push(val[j].close)
//         // }
//     }

//     list.reduce(function(array1, array2) {
//         return array1.map(function(value, index) {
//             // console.log(array2[index])
//           return value.close + array2[index].close;
//         });
//     });

//     // list.reverse()
//     setList(list[list.length-1])

//     return entries
// }

export const original = function (pass, stocksData, setOrigi, setAvg)  {
    let obj = {}
    let sum = 0

    const start = 0 
    const end = 500
    stocksData.slice()


    stocksData.forEach(tick => {
        sum += (tick.originalPrice * tick.qty)
        obj[tick.ticker]={ qty: tick?.qty, originalPrice: tick?.originalPrice} 
    })  
    setOrigi(obj)
    setAvg(sum)
    return {pass, obj}
};

export const currentPrice = function ({pass, obj}, setCurrent, setTotal) {

    console.log('logitmeeetotla==========================', setCurrent, setTotal)
    let current = 0
    let total = 0
    for (const [key, val] of Object.entries(pass)) {
        current += (pass[key][0].close  * obj[key].qty) - (obj[key].originalPrice*obj[key].qty)
        total += (pass[key][0].close  * obj[key].qty)
    }
    setCurrent(current)
    setTotal(total)
}

export const dayCounter = function(days, today) {
    return new Date(today.setDate(today.getDate()-days)).toISOString().split('T')[0]
}
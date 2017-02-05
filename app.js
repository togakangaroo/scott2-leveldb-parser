const levelup = require('levelup')
const db = levelup('./data')

const rand = (max, min = 0) => Math.floor((max + min) * Math.random() - min)
const pickRandom = (count, arr) =>
      count <= 0 ? [] : arr.splice(rand(arr.length), 1).concat(pickRandom(count-1, arr))


const records = []
db.createReadStream({ keys: true, values: true })
    .on('data', ({key, value}) => {
        const obj = JSON.parse(value)
        records.push(obj)
    })
    .on('end', () => {
        const objsToShow = pickRandom(5, records)
        for(let obj of objsToShow) {
            for(let k of Object.keys(obj))
                console.log(`${k}\t\t${obj[k]}`)
            console.log(`-----------------\n`)
        }
    })

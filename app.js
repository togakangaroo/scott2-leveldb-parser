const levelup = require('levelup')
const db = levelup('./data')

const rand = (max, min = 0) => Math.floor((max + min) * Math.random() - min)
const pickRandom = (count, arr) =>
      count <= 0 ? [] : arr.splice(rand(arr.length), 1).concat(pickRandom(count-1, arr))

const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(8121, () => {
    console.log('Example app listening on http://localhost:8121')
})

// const records = []
// db.createReadStream({ keys: true, values: true })
//     .on('data', ({key, value}) => {
//         try {
//             records.push(JSON.parse(value))
//         } catch(e) {
//             console.error(e)
//         }
//     })
//     .on('end', () => {
//         console.log(`All data read in`)
//     })

// const showRandomRecords = () => {
//     const objsToShow = pickRandom(5, records)
//     for(let obj of objsToShow) {
//         for(let k of Object.keys(obj))
//             console.log(`${k}\t\t${obj[k]}`)
//         console.log(`-----------------\n`)
//     }
// }

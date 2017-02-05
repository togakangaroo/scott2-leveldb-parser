const express = require('express')
const app = express()
const gettingRecords = require('./data')
const uniq = require('lodash/uniq')
const pick = require('lodash/pick')
require('csv-express')

app.set('view engine', 'pug')

const uniqueKeysOfAll = objs =>
    uniq(objs.map(Object.keys).reduce((prev, keys) => prev.concat(keys), []))
const gettingRecordData = gettingRecords.then(records => {
    return {
        records,
        properties: uniqueKeysOfAll(records)
    }
})
app.get('/', (req, res) => {
    gettingRecordData.then(({records, properties}) => {
        res.render('index', {
            message: `There are ${records.length} records`,
            properties
        })
    })
})

app.get('/csv', (req, res) => {
    const query = req.query
    const startDate = Date.parse(query.startDate)
    const endDate = Date.parse(query.endDate)
    const desiredColumns = Object.keys(query.columns).filter(name => query.columns[name] === 'on')
    gettingRecordData
        .then(({records}) =>
            records.filter(r => {
                const d = Date.parse(r.post_date)
                return startDate <= d && d <= endDate
            })
        )
        .then((records) => records.map(r => pick(r, desiredColumns)))
        .then(records => {
            console.log(`Outputing ${records.length} records`)
            res.csv([
                desiredColumns,
                ...records.map(r => desiredColumns.map(c => r[c]))
            ])
        }).then(null, (err) => console.error(err))
})

app.listen(8121, () => {
    console.log('App listening on http://localhost:8121')
})

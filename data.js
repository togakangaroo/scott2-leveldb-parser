const levelup = require('levelup')
const db = levelup('./data')


module.exports = new Promise((resolve) => {
    const records = []
    db.createReadStream({ keys: true, values: true })
        .on('data', ({key, value}) => {
            try {
                records.push(JSON.parse(value))
            } catch(e) {
                console.error(e)
            }
        })
        .on('end', () => {
            resolve(records)
        })
})

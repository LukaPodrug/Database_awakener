const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cron = require('node-cron')

require('dotenv').config()

const tvornicaSnageDatabase = require('./database/tvornica_snage')

const { PORT } = process.env

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get((req, res) => {
    res.status(200).json('App recieved get request')
})

const tvornicaSnageJob = cron.schedule('*/3 * * * *', async () => {
    try {
        const adminUsernames = await tvornicaSnageDatabase`
            select username
            from coaches`
        console.log('Tvornica snage job finished')
        return adminUsernames
    }
    catch(error) {
        console.log(error)
        return
    }
})

tvornicaSnageJob.start()

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
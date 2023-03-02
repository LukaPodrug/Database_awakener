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

const tvornicaSnageJob = cron.schedule('*/5 * * * *', async () => {
    try {
        const admins = await tvornicaSnageDatabase`
            select username
            from coaches`
        return admins
    }
    catch(error) {
        console.log(error)
        return error
    }
})

tvornicaSnageJob.start()

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
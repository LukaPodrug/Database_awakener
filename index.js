const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cron = require('node-cron')

require('dotenv').config()

const tvornicaSnageDatabase = require('./database/tvornica_snage')
const sudokuSolverDatabase = require('./database/sudoku_solver')

const { PORT } = process.env

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).json('App recieved get request')
})

const tvornicaSnageJob = cron.schedule('*/1 * * * *', async () => {
    try {
        const version = await tvornicaSnageDatabase`select version()`
        console.log('Tvornica snage job finished')
        return version
    }
    catch(error) {
        console.log(error)
        return
    }
})

tvornicaSnageJob.start()

const sudokuSolverJob = cron.schedule('*/1 * * * *', async () => {
    try {
        const version = await sudokuSolverDatabase`select version()`
        console.log('Sudoku solver job finished')
        return version
    }
    catch(error) {
        console.log(error)
        return
    }
})

sudokuSolverJob.start()

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
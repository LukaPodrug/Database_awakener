const postgres = require('postgres')

require('dotenv').config()

const { SUDOKU_SOLVER_PGHOST, SUDOKU_SOLVER_PGDATABASE, SUDOKU_SOLVER_PGUSER, SUDOKU_SOLVER_PGPASSWORD, SUDOKU_SOLVER_ENDPOINT_ID } = process.env

const connectionString = `postgres://${SUDOKU_SOLVER_PGUSER}:${SUDOKU_SOLVER_PGPASSWORD}@${SUDOKU_SOLVER_PGHOST}/${SUDOKU_SOLVER_PGDATABASE}?options=project%3D${SUDOKU_SOLVER_ENDPOINT_ID}`
const database = postgres(connectionString, {ssl: 'require'})

module.exports = database
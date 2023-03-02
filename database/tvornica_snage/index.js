const postgres = require('postgres')

require('dotenv').config()

const { TVORNICA_SNAGE_PGHOST, TVORNICA_SNAGE_PGDATABASE, TVORNICA_SNAGE_PGUSER, TVORNICA_SNAGE_PGPASSWORD, TVORNICA_SNAGE_ENDPOINT_ID } = process.env

const connectionString = `postgres://${TVORNICA_SNAGE_PGUSER}:${TVORNICA_SNAGE_PGPASSWORD}@${TVORNICA_SNAGE_PGHOST}/${TVORNICA_SNAGE_PGDATABASE}?options=project%3D${TVORNICA_SNAGE_ENDPOINT_ID}`
const database = postgres(connectionString, {ssl: 'require'})

module.exports = database
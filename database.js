const pgp = require('pg-promise')()

const database = 'test_posts'

const connection = 'postgres://postgres:12345678@localhost:5432/' + database

const db = pgp(connection)

module.exports = db

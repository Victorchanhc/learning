import type { Knex } from 'knex'
import dotenv from 'dotenv'
// Update with your config settings.
dotenv.config()

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'postgresql',
		connection: {
			database: process.env.DB_NAME,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		},
		debug: true
	},
	production: {
		client: 'postgresql',
		connection: {
			database: process.env.DB_NAME,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
}

module.exports = config

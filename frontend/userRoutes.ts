import express from 'express'
import { knex } from './app'

export const userRoutes = express.Router()

userRoutes.use('/getUser', getUser)
userRoutes.put('/editUser', editUser)
userRoutes.post('/register', addUser)

export async function getUser(req: express.Request, res: express.Response) {
	try {
		if (req.session.user || undefined) {
			const result = await knex
				.select('*')
				.from('users')
				.where('users.email', req.session.user)

			res.json(result)
		} else {
			res.json('Please Log in !')
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({ msg: 'cannot not get file' })
	}
}

async function editUser(req: express.Request, res: express.Response) {
	try {
		// Route 1: update user info
		// Route 2: update user password
		await knex('users')
			.update({
				email: req.body.email,
				password: req.body.password,
				name: req.body.name,
				date_of_birth: req.body.date_of_birth,
				updated_at: 'now()'
			})
			.where('email', req.session.user)

		res.json({ msg: 'successful' })
	} catch (err) {
		console.log(err)
		res.status(500).json({ msg: 'cannot not edit user' })
	}
}

async function addUser(req: express.Request, res: express.Response) {
	try {
		// hashing
		const [user] = await knex
			.insert({
				email: req.body.email,
				password: req.body.password,
				name: req.body.name,
				date_of_birth: req.body.date_of_birth
			})
			.into('users')
			.returning('id')

		await knex
			.insert([
				{ user_id: user.id, club_id: '1', photo_name: '' },
				{ user_id: user.id, club_id: '2', photo_name: '' },
				{ user_id: user.id, club_id: '3', photo_name: '' }
			])
			.into('collections')

		req.body.email = req.session.user
		res.redirect('/')
	} catch (err) {
		console.log(err)
		res.status(500).json({ msg: 'cannot not create user' })
	}
}

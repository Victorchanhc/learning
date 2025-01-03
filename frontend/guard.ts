import express from 'express'

export const isLoggedIn = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	console.log(req.session)
	if (req.session?.user) {
		next()
	} else {
		console.log('Redirect by isLoggedIn')
		res.redirect('/')
	}
}

import { Request, Response } from 'express'

export function createRequest() {
	return {
		body: {},
		params: {},
		session: { user: {} }
	} as unknown as Request
}

export function createResponse() {
	let res: any = {}
	res.status = jest.fn((status: number) => res)
	res.json = jest.fn(() => null)
	return res as Response
}

const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const {  Stock } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/:id', requireAuth, asyncHandler(async (req, res) => {
		const { id } = req.params;
		
		const stocks = await Stock.all({ id })

		return res.json({
			stocks
		})

	})
);

router.post('/', asyncHandler(async (req, res) => {

		const { ticker, originalPrice, qty, userId } = req.body

		const response = await Stock.purchase({
				ticker,
				originalPrice,
				qty,
				userId
		});
		// console.log('whatami-----------------------------------', response)
		return res.json({response})
		// return await response.findByPk(response.id)
	})
);

router.post('/update', asyncHandler(async (req, res) => {
		const { userId, ticker, amount, qty } = req.body 

		const response = await Stock.updateStock({
			userId,
			ticker,
			amount,
			qty
		})

		return res.json({
			response
		})
	})
)

router.delete('/:id', asyncHandler(async (req, res) => {
		const {id} = req.params;

		console.log('thisismyidsnumas================', id)
		const stock = await Stock.findByPk(id)

		console.log('thisismyidsnumas=fuck===============', stock)
		
		if (stock) {
			Stock.sell(id)
			return id
		} 

		return {message: 'error'}
	})
)



module.exports = router;
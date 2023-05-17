const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const {  Stock } = require('../../db/models');

router.get('/:id', asyncHandler(async (req, res) => {
		const { id } = req.params;
		
		const stocks = await Stock.all({ id })

		return res.json({
				stocks
		})

	})
);

router.get('/', asyncHandler(async (req, res) => {
		const {ticker, originalPrice, qty, userId } = req.body

		const response = await Stock.purchase({
				ticker,
				originalPrice,
				qty,
				userId
		});

		return await response.findByPk(response.id)
	})
);



module.exports = router;
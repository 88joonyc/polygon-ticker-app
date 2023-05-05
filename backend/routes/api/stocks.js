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
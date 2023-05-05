const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Wallet } = require('../../db/models');

router.post('/', asyncHandler(async (req, res) => {
        const { buyingPower, userId, accountType } = req.body;
        const wallet = await Wallet.make({ buyingPower, userId, accountType });

        return res.json({
            wallet,
        })  
    })
);

router.post('/update', asyncHandler( async (req, res) => {
        const { userId, accountType, amount } = req.body;
        const wallet = await Wallet.updateWallet({ userId, accountType, amount });

        return res.json({
            wallet,
        })
    
    })
);

module.exports = router
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const stockRouter = require('./allStocks.js');
const walletRouter = require('./wallet.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/ticker', stockRouter);

router.use('/wallet', walletRouter)

module.exports = router;
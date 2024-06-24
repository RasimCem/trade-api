const { now } = require('sequelize/lib/utils');
const { Share, Transaction, PriceUpdate, PortfolioItem } = require('../models')

const getAll = async (req, res) => {
    try {
        const share = await Share.findAll();

        res.json(share);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getById = async (req, res) => {
    try {
        const share = await Share.findByPk(req.params.id);

        res.json(share);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const create = async (req, res) => {
    try {
        const { symbol, price } = req.body;
        const share = await Share.create({ symbol, price });

        res.json({ share });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const update = async (req, res) => {
    try {
        // TODO:
        // todo: PriceUpdates adında yeni bir model ekle
        // bu modelde her güncelelyenin verisini tut.
        // const priceUpdate = PriceUpdate.findOne({ where: { symbol, user_id: req.user.id } });
        // if (priceUpdate) {
        //     res.status(500).json({error: 'You can buy only once in 1 hour!'});
        // }
        // const priceUpdate = PriceUpdate.findOne({ where: { symbol, user_id: req.user.id } });
        // if (priceUpdate) {
        //     res.status(500).json({error: 'You can buy only once in 1 hour!'});
        // }
        // await PriceUpdate.create({
        //     user_id: req.user.id,
        //     symbol: symbol,
        //     createdAt: now()
        // });


        const { price } = req.body;
        const share = await Share.findByPk(req.params.id);
        await share.update({ price });

        res.json(share);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const buyShare = async (req, res) => {


    try {
        const { portfolioId, quantity, symbol } = req.body;
        const share = await Share.findOne({ where: { symbol } });
        if (!share) {
            res.status(404).json({ error: 'Share not found!' });
        }
        let price = quantity * share.price;
        const transaction = await Transaction.create({
            type: 'buy',
            quantity: quantity,
            price: price,
            shareSymbol: symbol,
            portfolioId: portfolioId
        });
        const portfolioItem = await PortfolioItem.findOne({ where: { portfolioId, shareSymbol: symbol } });
        if (portfolioItem) {
            portfolioItem.update({
                quantity: portfolioItem.quantity + quantity,
            });
        } else {
            await PortfolioItem.create({
                portfolioId: portfolioId,
                shareSymbol: symbol,
                quantity
            });
        }

        res.json({ transaction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const sellShare = async (req, res) => {
    try {

        const { portfolioId, quantity, symbol } = req.body;
        const share = await Share.findOne({ where: { symbol } });
        if (!share) {
            res.status(404).json({ error: 'Share not found!' });
        }
        // check user enough share to sell
        const portfolioItem = await PortfolioItem.findOne({ where: { portfolioId, shareSymbol: symbol } });
        if (!portfolioItem || portfolioItem?.quantity < quantity) {
            res.status(404).json({ error: 'Not enough quantity to sell.' });
        } else {
            portfolioItem.update({
                quantity: portfolioItem.quantity - quantity,
            });
        }
        let price = quantity * share.price;
        const transaction = await Transaction.create({
            type: 'sell',
            quantity: quantity,
            price: price,
            shareSymbol: symbol,
            portfolioId: portfolioId
        });
        res.json({ transaction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    buyShare,
    sellShare
};
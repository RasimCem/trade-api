const { Portfolio, Transaction, PortfolioItem } = require('../models')

const getById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Transaction,
                    as: "transactions"
                },
                {
                    model: PortfolioItem,
                    as: "items"
                }
            ],
        });

        res.json({ portfolio });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const create = async (req, res) => {
    try {
        // get authenticated user and create portfolio
        portfolio = await Portfolio.create({
            userId: req.user.id,
        });
        res.json({ portfolio, message: "Portfolio kaydı başarılı." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getById,
    create
};
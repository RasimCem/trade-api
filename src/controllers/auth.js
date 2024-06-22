const { User } = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { name, lastName, email, password } = req.body;
        user = await User.create({
            name, lastName, email, password
        });
        res.json({ user, message: "Kullanıcı kaydı başarılı." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            user.password = undefined;
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_SECRET_KEY);
            const userData = user.toJSON();
            userData.access_token = token;
            res.status(200).json({ user: userData });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

const me = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: 'Token is missing' });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token is invalid or expired' });
        try {
            console.log(decoded);
            const user = await User.findByPk(decoded.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error: 'Error while fetching a user.' });
        }
    });
}


module.exports = {
    register,
    login,
    me
};
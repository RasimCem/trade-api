const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    const token = bearerToken && bearerToken.split(' ')[1];
    if (token == null) return res.status(401).json({ message: "Unauthenticated access token!" });

    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedPayload;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = verifyAccessToken;
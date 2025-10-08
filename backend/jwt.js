const jwt = require('jsonwebtoken');

// Ensure there's a secret in development; in production the JWT_SECRET must be set
const getSecret = () => {
    if (!process.env.JWT_SECRET) {
        console.warn('WARNING: JWT_SECRET is not set. Using a development fallback secret. Do NOT use this in production.');
        return 'dev_fallback_secret_change_me';
    }
    return process.env.JWT_SECRET;
};

const jwtAuthMiddleware = (req, res, next) => {
    // first check request headers has authorization or not
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token Not Found' });

    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, getSecret());

        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT verification error:', err.message || err);
        res.status(401).json({ error: 'Invalid token' });
    }
};


// Function to generate JWT token
const generateToken = (userData) => {
    const secret = getSecret();
    try {
        // Use a readable duration; adjust as needed (e.g., '1h')
        return jwt.sign(userData, secret, { expiresIn: '1h' });
    } catch (err) {
        console.error('Error generating JWT:', err.message || err);
        throw err;
    }
};

// Middleware that ensures the requester is an authenticated admin
const adminAuthMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token Not Found' });

    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, getSecret());

        // Lazy require to avoid circular issues
        const User = require('./models/user');
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ error: 'Invalid token user' });

        if (user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });

        // Attach user info and continue
        req.user = { id: user.id, role: user.role, name: user.name };
        next();
    } catch (err) {
        console.error('Admin JWT verification error:', err.message || err);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { jwtAuthMiddleware, generateToken, adminAuthMiddleware };
import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
    try {

        const token = req.cookies?.accessToken || req.header('Authorization')?.split(" ")[1];
        //console.log(token, "middleware token")

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Access."
            })
        }

        const decodedUser = jwt.verify(token, `${process.env.JWT_TOKEN_SECRET_KEY}`) // verifying the token with the currect one 

        if (!decodedUser) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        // These lines of code are part of the middleware. They attach specific values to the "req" object, which is then passed along the request lifecycle to the next middleware or route handler.

        req.user = decodedUser;
        req.cookie = token;

        next(); // passing the control to next fn

    } catch (error) { // error msg if the token is expired
        if (error.message === "jwt expired") {
            return res.status(401).json({
                message: "Login please."
            })
        }
        if (error.message === 'JsonWebTokenError') { // error msg if the token is incorrect
            return res.status(400).json({
                message: "Invalid Token"
            })
        }
        else {
            return res.status(400).json({ // for other unseen errors
                message: error
            })
        }
    }
}

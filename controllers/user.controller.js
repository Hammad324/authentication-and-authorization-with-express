import { users } from "../models/user.model.js"
import jwt from "jsonwebtoken";

// login controller 
export const userLogin = (req, res) => {
    const { email, password } = req.body; // extracting the info from body

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are compulsory."
        }) // if one of the fields are unavailable error is thrown
    }

    const user = Object.values(users).find(user => user.email === email && user.password === password); // finding the user

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    } // is error is credentials

    const token = jwt.sign( // generating the token
        user,
        `${process.env.JWT_TOKEN_SECRET_KEY}`,
        { expiresIn: '300s' } // dont know why is this not working
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    //req.token = token
    return res.status(200)
        .cookie("accessToken", token, options)
        .json({ user, token })
}

// view profile controller 

export const view = (req, res) => {
    const token = req.cookie; // gettinf the cookie
    const user = req.user; // getting the user 
    const auth = jwt.verify (token, `${process.env.JWT_TOKEN_SECRET_KEY}`) // verifying the cookie and unwraping the jwt to compare the user and auth
    
    
    if (user.username == auth.username) { // comparision to make sure we give the correct user 
        return res.status(200).json({
            user: user,
            message: "User Authenticated"
        })
    } else {
        return res.status(400).json({
            user: user,
            message: "Unauthorized Request"
        })
    }
    
}

// logout controller 

export const logoutUser = (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", options) // clear the cookie from client side 
        .json({
            message: "User successfully logged out"
        })
}

// change username controller 

export const changeUsername = (req, res) => {
    const {username} = req.body;

    const user = jwt.verify(req.cookie, `${process.env.JWT_TOKEN_SECRET_KEY}`) // verifying the cookies again to make sure correct user changes their username

    user.username = username; // username changed

    res.status(200).json({
        message: `username successfully changed. Your new username is ${username}`
    })
    // console.log(user.username)
}
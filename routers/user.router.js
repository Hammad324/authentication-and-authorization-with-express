import { Router } from "express";
import { 
    changeUsername,
    logoutUser, 
    userLogin, 
    view 
    } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/login').post(userLogin)
router.route('/view').get(verifyJWT, view)
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/changeUsername').post(verifyJWT, changeUsername)

export default router;
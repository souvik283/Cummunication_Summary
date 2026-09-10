import jwt from "jsonwebtoken"
import ENV from "./env.js"

export async function generateToken(user, res) {
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, ENV.jwt_secret, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60  * 60 * 1000,
        httpOnly: true,
        sameSite: ENV.node_environment === "development" ? "strict" : "None",
        secure: ENV.node_environment === "development" ? false : true
    })
    return token
}
import dotenv from "dotenv"

dotenv.config()

const ENV = {
    port: process.env.Port,
    mongoUrl: process.env.Mongo_url,
    node_environment: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET
}

export default  ENV
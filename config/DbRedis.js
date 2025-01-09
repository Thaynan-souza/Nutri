const redis = require('redis');

require('dotenv').config();

module.exports = () => {

    return redis.createClient({
        socket:{
            host: process.env.redis_host,
            port: process.env.redis_port,
            tls: true,
        },          
        username: process.env.redis_username,
        password: process.env.redis_password,
        }
    )
}
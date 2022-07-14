const {TwitterApi} = require("twitter-api-v2")

const client = new TwitterApi({
    appKey: "your appKey here",
    appSecret: "your appSecret here",
    accessToken: "your accessToken here",
    accessSecret: "your accessSecret here"
})

const rwClient = client.readWrite

module.exports = rwClient

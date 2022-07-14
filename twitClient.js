const {TwitterApi} = require("twitter-api-v2")

const client = new TwitterApi({
    appKey: "2q2zAu1V7RmbyZ9dMpReN7klB",
    appSecret: "36FqYmFDI3TDh33xLB9kth9vtqItEhHb6kJ3UFI1JrZ68Xzdzs",
    accessToken: "1543763322780221441-UN5Qz8eJuvpJJ1UlEUL2MXtU9uAwWa",
    accessSecret: "BOzXLPJbFqDI4aQD6Megst61vo8se9mKuQhebO2yftmkV"
})

const rwClient = client.readWrite

module.exports = rwClient
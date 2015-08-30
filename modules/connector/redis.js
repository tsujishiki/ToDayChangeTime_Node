var redis = require("redis");
var settings = require("../../settings");
var client = redis.createClient(settings.redis_port,settings.redis_host);

module.exports = client;
var crypto = require("crypto");

var settings = require('../settings');

exports.encrypt = function(data,key){ // 密码加密
    var cipher = crypto.createCipher("bf",key);
    var newPsd = "";
    newPsd += cipher.update(data,"utf8","hex");
    newPsd += cipher.final("hex");
    return newPsd;
}

exports.decrypt = function(data,key){ //密码解密
    var decipher = crypto.createDecipher("bf",key);
    var oldPsd = "";
    oldPsd += decipher.update(data,"hex","utf8");
    oldPsd += decipher.final("utf8");
    return oldPsd;
}
var express = require('express');
var crypto = require('crypto');
var uuid = require('node-uuid');

var Constant = require('../constant/Constant');
var ReturnBody = require('../modules/ReturnBody');
var TUser = require('../modules/user');
var Mail = require('../modules/mail');
var redis = require('../modules/connector/redis');
var System = require('../modules/system');
var settings = require('../settings');

var router = express.Router();

router.get('/autoLogin', function(req, res) {
    var returnBody = new ReturnBody();
    var token = req.cookies.token;
    if (token != null) {
        TUser.findOne({token: token},function (error,data) {
            if(!error) {
                if (data != null) {
                    req.session[Constant.Session_Key.USER] = data;
                    returnBody.status = Constant.Status.SUCCESS;
                    returnBody.data = data.nickName;
                } else {
                    returnBody.status = Constant.Status.FAILED;
                }
            }else{
                returnBody.status = Constant.Status.ERROR;
                returnBody.data = error;
            }
            res.json(returnBody);
        });
    }else{
        returnBody.status = Constant.Status.FAILED;
        res.json(returnBody);
    }

});

router.get('/logoff', function(req, res) {
    delete req.session[Constant.Session_Key.USER];
    var returnBody = new ReturnBody();
    returnBody.status = Constant.Status.SUCCESS;
    res.json(returnBody);
});

router.post('/', function(req, res) {
    var user = req.body;
    var returnBody = new ReturnBody();
    var user_userName = {"userName":user.userName};

    TUser.findOne(user_userName,function(error,data){
        if(data != null){
            var md5 = crypto.createHash('md5');
            if(! (data.password == md5.update(user.password).digest('hex'))){
                returnBody.status = Constant.Status.FAILED;
                returnBody.msg = "密码错误！";
            }else {
                returnBody.status = Constant.Status.SUCCESS;
                returnBody.msg = "Success";
                returnBody.redirectUrl = "/";
                var backData = {};
                var token = uuid.v1();
                backData.token = token;
                backData.nickName = data.nickName;
                backData.userName = data.userName;

                returnBody.data = backData;

                req.session[Constant.Session_Key.USER] = data;
                TUser.update({userid: data.userid}, {$set: {token: token}}, function (error) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        }else{
            returnBody.status = Constant.Status.FAILED;
            returnBody.msg = "邮箱不存在！";
        }

        res.json(returnBody);
    });

});

router.post('/retrieve',function(req, res){
    var user = req.body;
    var returnBody = new ReturnBody();
    var user_userName = {"userName":user.userName};
    TUser.findOne(user_userName,function(error,data) {
        if (data != null) {
            var oldLink = data.password +'$'+ data.userName +'$'+ settings.app_secret_key;
            var newLink = System.encrypt(oldLink,settings.app_secret_key);

            redis.set(settings.mail_redis_prefix + user.userName,newLink,redis.print);
            redis.expire(settings.mail_redis_prefix + user.userName,settings.mail_expire);

            Mail.sendRestPWMail(user,newLink,function(error){
                if(error){
                    returnBody.status = Constant.Status.FAILED;
                    returnBody.msg = '数据处理出错';
                }else{
                    returnBody.status = Constant.Status.SUCCESS;
                }
                res.json(returnBody);
            })
        }else{
            returnBody.status = Constant.Status.FAILED;
            returnBody.msg = '邮箱填写不正确，无对应用户';
            res.json(returnBody);
        }
    });
});

router.get('/resetValid/:token',function(req, res){
    var token = req.params.token;
    var returnBody = new ReturnBody();
    try{
        var link = System.decrypt(token,settings.app_secret_key);
    }catch(err){
        returnBody.status = Constant.Status.ERROR;
        returnBody.msg = err.stack;
        res.json(returnBody);
        return ;
    }

    redis.get(settings.mail_redis_prefix + link.split('$')[1],function(err,data){
        if(!err){
            if(data != null){
                returnBody.status = Constant.Status.SUCCESS;
            }else{
                returnBody.status = Constant.Status.INVALIDATE;
            }
        }else{
            returnBody.status = Constant.Status.ERROR;
            returnBody.msg = err;
        }
        res.json(returnBody);
    });
});

module.exports = router;

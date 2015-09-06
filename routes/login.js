var express = require('express');
var crypto = require('crypto');
var uuid = require('node-uuid');
var Status = require('../constant/Status');
var System = require('../constant/System');
var ReturnBody = require('../modules/ReturnBody');
var userSer = require('../modules/user');

var router = express.Router();

router.get('/autoLogin', function(req, res) {
    var returnBody = new ReturnBody();
    var token = req.cookies.token;
    if (token != null) {
        userSer.validUser({token: token}).then(function (data) {
            if (data != null) {
                req.session[System.USER] = data;
                returnBody.status = Status.SUCCESS;
                returnBody.data = data.nickName;
            } else {
                returnBody.status = Status.FAILED;
            }
            res.json(returnBody);
        });
    }else{
        returnBody.status = Status.FAILED;
        res.json(returnBody);
    }

});

router.get('/logoff', function(req, res) {
    delete req.session[System.USER];
    var returnBody = new ReturnBody();
    returnBody.status = Status.SUCCESS;
    res.json(returnBody);
});

router.post('/', function(req, res) {
    var user = req.body;
    var returnBody = new ReturnBody();
    var user_userName = {"userName":user.userName};

    userSer.validUser(user_userName).then(function(data){
        if(data != null){
            var md5 = crypto.createHash('md5');
            if(!data.password == md5.update(user.password).digest('hex')){
                returnBody.status = Status.FAILED;
                returnBody.msg = "密码错误！";
            }else{
                returnBody.status = Status.SUCCESS;
                returnBody.msg = "Success";
                returnBody.redirectUrl= "/";
                var backData = {};
                var token = uuid.v1();
                backData.token = token;
                backData.nickName = data.nickName;
                backData.userName = data.userName;

                returnBody.data = backData;


                req.session[System.USER] = data;
                userSer.updateToken(data.userid,token);
            }
        }else{
            returnBody.status = Status.FAILED;
            returnBody.msg = "用户名不存在！";
        }

        res.json(returnBody);
    });

});

module.exports = router;

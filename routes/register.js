/**
 * Created by FunkySoya on 2015/8/30.
 */
var express = require('express');
var Q = require('q');
var router = express.Router();

var Status = require('../constant/Status');
var userSer = require('../modules/user');
var ReturnBody = require('../modules/ReturnBody');

/**
 * 注册
 */
router.post('/', function(req, res) {
    var user = req.body;
    var returnBody = new ReturnBody();

    var user_userName = {"userName":user.userName};
    var user_nickName = {"nickName":user.nickName};

    userSer.validUser(user_userName).then(function(data){//校验用户名
        if(data == null || data == undefined){
            userSer.validUser(user_nickName).then(function(data){//校验昵称
                if(data == null || data == undefined){
                    userSer.addUser(user).then(function(data){
                        if(data){
                            returnBody.status = Status.DEFER_MESSAGE;
                            returnBody.msg = "注册成功";
                            res.json(returnBody);
                        }
                    });

                }else{
                    returnBody.status = Status.NICKNAME_DUPLICATE;
                    res.json(returnBody);
                }
            });
        }else{
            returnBody.status = Status.USERNAME_DUPLICATE;
            res.json(returnBody);
        }
    })


});

module.exports = router;
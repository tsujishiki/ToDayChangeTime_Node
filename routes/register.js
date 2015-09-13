/**
 * Created by FunkySoya on 2015/8/30.
 */
var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var Status = require('../constant/Status');
var TUser = require('../modules/user');
var ReturnBody = require('../modules/ReturnBody');

/**
 * 注册
 */
router.post('/', function(req, res) {
    var user = req.body;
    var returnBody = new ReturnBody();

    var user_userName = {"userName":user.userName};
    var user_nickName = {"nickName":user.nickName};

    TUser.findOne(user_userName,function(error,data){//校验用户名
        if(data == null || data == undefined){
            TUser.findOne(user_nickName,function(error,data){//校验昵称
                if(data == null || data == undefined){
                    var md5 = crypto.createHash('md5');
                    user.password = md5.update(user.password).digest('hex');
                    user.createDate = new Date();
                    user.token = '';
                    delete user.passwordConfirm;

                    TUser.create(user,function(error,data){
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

    //Tuser.validUser(user_userName).then(function(data){//校验用户名
    //    if(data == null || data == undefined){
    //        Tuser.validUser(user_nickName).then(function(data){//校验昵称
    //            if(data == null || data == undefined){
    //                Tuser.addUser(user).then(function(data){
    //                    if(data){
    //                        returnBody.status = Status.DEFER_MESSAGE;
    //                        returnBody.msg = "注册成功";
    //                        res.json(returnBody);
    //                    }
    //                });
    //
    //            }else{
    //                returnBody.status = Status.NICKNAME_DUPLICATE;
    //                res.json(returnBody);
    //            }
    //        });
    //    }else{
    //        returnBody.status = Status.USERNAME_DUPLICATE;
    //        res.json(returnBody);
    //    }
    //})

    //Tuser.validUser(user_userName)
    //.then(Tuser.validUser(user_nickName))
    //.then(Tuser.addUser(user))
    //.then(function(data){
    //    console.log(3);
    //    if(data){
    //        returnBody.status = Status.DEFER_MESSAGE;
    //        returnBody.msg = "注册成功";
    //        res.json(returnBody);
    //    }
    //});

});

module.exports = router;
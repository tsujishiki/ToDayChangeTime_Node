var express = require('express');
var crypto = require('crypto');
var uuid = require('node-uuid');
var Status = require('../constant/Status');
var ReturnBody = require('../modules/ReturnBody');
var userSer = require('../modules/user');

var router = express.Router();

router.get('/autoLogin', function(req, res) {
    res.send({status:Status.FAILED});
});

router.get('/logoff', function(req, res) {
    res.send({status:Status.SUCCESS});
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

                backData.token = uuid.v1();
                backData.nickName = data.nickName;
                backData.userName = data.userName;

                returnBody.data = backData;
                //
                //userSer.updateToken(user.getUserId(), token);
                //
                //HttpSession session = request.getSession();
                //session.setAttribute(Context.USER, user);
            }
        }else{
            returnBody.status = Status.FAILED;
            returnBody.msg = "用户名不存在！";
        }

        res.json(returnBody);
    });

});

module.exports = router;

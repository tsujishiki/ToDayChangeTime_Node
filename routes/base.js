/**
 * ��������
 * Created by FunkySoya on 2015/8/30.
 */

var express = require('express');
var util = require('util');
var redis = require('../modules/connector/redis');
var ReturnBody = require('../modules/ReturnBody');
var Constant = require('../constant/Constant');
//var ccap = require('ccap');

var router = express.Router();

/*var ary = ccap.get();

router.get('/captcha-image', function(req, res) {
    var ary = ccap.get();
    var txt = ary[0];
    var buf = ary[1];
    response.end(buf);
    console.log(txt);
});*/

/**
 * 字典基础服务
 */
router.get('/baseData/:type',function(req,res){
    var type = req.params.type;
    redis.hgetall(type,function(err,data){
        var retrunBody = new ReturnBody();
        var dicts = [];
        if(!err) {
            for(var i in data){
                var dict = {};
                dict.code = i;
                dict.name = data[i];
                dicts.push(dict);
            }
            retrunBody.data = dicts;
            retrunBody.status = Constant.Status.SUCCESS;
        }else{
            retrunBody.status = Constant.Status.FAILED;
            retrunBody.msg = '出错了!';
        }
        res.json(retrunBody);
    });
})

module.exports = router;
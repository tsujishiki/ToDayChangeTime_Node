
module.exports = {
    mongodb_name : 'tdct',
    mongodb_host : 'localhost',
    mongodb_port : '27017',
    mongodb_poolSize  : 5,
    mongodb_reconnect  : true,

    redis_host : 'localhost',
    redis_port : '6379',
    redis_session_timeout : 60 * 60,   //Session的有效期为1小时
};
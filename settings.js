
module.exports = {
    mongodb_name : 'tdct',
    mongodb_host : 'localhost',
    mongodb_port : '27017',
    mongodb_poolSize  : 5,
    mongodb_reconnect  : true,
    mongodb_url : 'mongodb://localhost:27017/tdct',

    redis_host : 'localhost',
    redis_port : '6379',
    redis_session_timeout : 60 * 60,   //Session的有效期为1小时

    mail_host : 'smtp.163.com',
    mail_ssl : true,
    mail_port : '465',
    mail_user : 'xxxxxx@163.com',
    mail_password : 'xxxxxx',
    mail_name : 'kakkoii',
    mail_redis_prefix : 'mail_forgot:',
    mail_expire : 60 * 5,

    app_hostname : 'localhost:3000',
    app_secret_key : 'funky soya'
};
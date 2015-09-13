var nodemailer = require("nodemailer");
var settings = require('../settings');

// 设置邮件内容
var mailOptions = {
    from: settings.mail_name + '<' + settings.mail_user + '>',
    to: 'kakkoii_yo@foxmail.com',
    subject: "[卡库蚁]找回密码",
    html: '<p>hello</p>'
};

// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport("SMTP",{
    host: settings.mail_host, // 主机
    secureConnection: true, // 使用 SSL
    port: settings.mail_port, // SMTP 端口
    auth: {
        user: settings.mail_user,
        pass: settings.mail_password
    }
});

// 发送邮件
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
    smtpTransport.close(); // 如果没用，关闭连接池
});
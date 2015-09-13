var nodemailer = require("nodemailer");
var settings = require('../settings');

exports.sendRestPWMail = function(user,token,callback){

    var mailAddr = user.userName != null ? user.userName : user;

    // 设置邮件内容
    var mailOptions = {
        from: settings.mail_name + '<' + settings.mail_user + '>',
        to: mailAddr,
        subject: "[卡库蚁]找回密码",
        html: getMailContentTemplate(token)
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
            callback(error);
        }else{
            callback();
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close(); // 如果没用，关闭连接池
    });
}

function getMailContentTemplate(token){
    var html  = '<b>点击链接重设密码</b><br>';
    html += '<a href="http://' + settings.app_hostname +'/reset_pw/' + token + '">http://' + settings.app_hostname + '/reset_pw/' + token + '</a><br>';
    html += '链接五分钟内有效，若链接无法点击请复制到浏览器中访问。';
    return html
}
/**
 * Created by FunkySoya on 2015/6/5.
 */
app.factory('BaseDataService',['$q','$http',function($q,$http){
    return {
        getByType:function(type){
            var deferred = $q.defer();
            $http.get('/ajax/base/baseData/'+type).success(function(obj){
                if(obj.status==Status.SUCCESS) {
                    deferred.resolve(obj.data);
                }
            });
            return deferred.promise;
        }
    }
}])
.factory('LoginService',['$q','$http',function($q,$http){
    var loginInfo = {hasLogin:false};
    return {
        login:function(form){
            var deferred = $q.defer();
            $http.post('/ajax/login', form).success(function (obj) {
                if(obj.status==Status.SUCCESS) {
                    $.cookie('userName',obj.data.userName,{expires: 7});
                    $.cookie('nickName',obj.data.nickName,{expires: 7});
                    if(form.isRemember){
                        $.cookie('token',obj.data.token,{expires: 7});
                    }
                    loginInfo.info = obj.data.nickName;
                    loginInfo.hasLogin = true;
                    loginInfo.loginerror = false;
                }else{
                    loginInfo.hasLogin = false;
                    loginInfo.loginerror = true;
                    loginInfo.loginerroinfo = obj.msg;
                }
                deferred.resolve(loginInfo);
            });
            return deferred.promise;
        },
        logOff : function(){
            $http.get('/ajax/login/logoff').success(function(obj){
                if(obj.status==Status.SUCCESS){
                    $.cookie('token', '', { expires: -1 });
                    $.cookie('nickName', '', { expires: -1 });
                    location.href = '/'
                }
            });
        },
        autoLogin : function(){
            //自动登陆验证
            var deferred = $q.defer();
            $http.get('/ajax/login/autoLogin').success(function(obj){
                if(obj.status==Status.SUCCESS){
                    loginInfo.hasLogin = true;
                    loginInfo.info = obj.data;
                } else{
                    loginInfo.hasLogin = false;
                    loginInfo.info = '';
                    //$.cookie('token','',{expires: -1});
                }
                deferred.resolve(loginInfo);
            });
            return deferred.promise;
        },
        retrieve:function(form){
            var deferred = $q.defer();
            var info = {};
            $http.post('/ajax/login/retrieve',form).success(function(obj){
                if(obj.status==Status.SUCCESS) {
                    info.sendSuccess = true;
                }else{
                    info.sendSuccess = false;
                    info.error = true;
                    info.errorinfo = obj.msg;
                }
                deferred.resolve(info);
            });
            return deferred.promise;
        },
        restValid:function(token){
            var deferred = $q.defer();
            var info = {};
            $http.get('/ajax/login/resetValid/'+token).success(function(obj){
                if(obj.status==Status.SUCCESS) {
                    info.validSuccess = true;
                }else{
                    info.validSuccess = false;
                    info.error = true;
                    info.errorinfo = obj.msg;
                }
                deferred.resolve(info);
            });
            return deferred.promise;
        },
        resetpw:function(form){
            var deferred = $q.defer();
            var info = {};
            $http.post('/ajax/login/retrieve',form).success(function(obj){
                if(obj.status==Status.SUCCESS) {
                    info.sendSuccess = true;
                }else{
                    info.sendSuccess = false;
                    info.error = true;
                    info.errorinfo = obj.msg;
                }
                deferred.resolve(info);
            });
            return deferred.promise;
        },
        getLoginInfo:function(){
            return loginInfo;
        }
    }
}])
.factory("RegisterService",['$q','$http',function($q,$http){
   return{
       register : function(form){
           var deferred = $q.defer();
           $http.post('/ajax/register',form).success(function(data){
               deferred.resolve(data);
           });
           return deferred.promise;
       },
       remoteValid : function(userName){
           var deferred = $q.defer();
           $http.post('/ajax/register/validUserName',{'userName':userName}).success(function(data){
               deferred.resolve(data);
           });
           return deferred.promise;
       }
   }
}])
.factory("BusinessService",['$q','$http',function($q,$http){
    return{
        add : function(business){
            var deferred = $q.defer();
            $http.post('/ajax/business',business).success(function(data){
                deferred.resolve(data);
            });
            return deferred.promise;
        }
    }
}])

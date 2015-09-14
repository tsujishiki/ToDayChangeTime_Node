/**
 * Created by Administrator on 2015/4/16.
 */

var app = angular.module('mainApp', ['ngRoute'])

/*****
 * 全局变量
 */
.value('deferMsg',{'msg':''})
.value('errorMsg',{'msg':''})


/*****
 * Interceptor
 */
.factory('statusInterceptor', ['$q','$location','deferMsg','errorMsg',function($q,$location,deferMsg,errorMsg) {
    var statusInterceptor = {
        response: function(response) {
            var deferred = $q.defer();
            if(response.data.status == Status.ERROR){//系统错误
                console.log(response.data.msg)
                errorMsg.msg = response.data.msg;
                $location.path('/error');
                return deferred.promise;
            }else if(response.data.status == Status.DEFER_MESSAGE){//延时消息提示
                deferMsg.msg = response.data.msg;
                $location.path('/deferMessage');
                return deferred.promise;
            }else if(response.data.status == Status.REDIRECT){//页面跳转
                $location.path( response.data.redirectUrl);
                return deferred.promise;
            }else{
                return response;
            }
        }
    };
    return statusInterceptor;
}])
/****
 *路由 模板设置
 */
.config(['$routeProvider','$locationProvider','$httpProvider', function ($routeProvider,$locationProvider,$httpProvider) {
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('statusInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'templates/main',
            controller: 'RouteMainCtl'
        })
        .when('/register', {
            templateUrl: 'templates/register',
            controller: 'RouteRegisterCtl'
        })
        .when('/login', {
            templateUrl: 'templates/login',
            controller: 'RouteLoginCtl'
        })
        .when('/forgot', {
            templateUrl: 'templates/forgot',
            controller: 'RouteForgotCtl'
        })
        .when('/reset_pw/:token', {
            templateUrl: '/templates/resetPassword',
            controller: 'RouteRestPWCtl'
        })
        .when('/error', {
            templateUrl: 'templates/error',
            controller: 'RouteErrorCtl'
        })
        .when('/deferMessage', {
            templateUrl: 'templates/deferMsg',
            controller: 'RouteDeferMsgCtl'
        })
        .when('/business', {
            templateUrl: 'templates/business/newBusiness',
            controller: 'RouteNewBusinessCtl',
            needPermission: true
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

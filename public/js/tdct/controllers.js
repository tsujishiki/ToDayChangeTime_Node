/**
 * Created by FunkySoya on 2015/6/5.
 * Controller
 */
app.controller('RouteMainCtl',['$scope','$location',function($scope,$location){

    $scope.createBusiness = function(){
        $location.path('createBusiness');
    };
}])
.controller('RouteErrorCtl',function($scope,$http){

})
.controller('RouteNewBusinessCtl',['$scope','BaseDataService','BusinessService',function($scope,BaseDataService,BusinessService){
    //游戏类型
    BaseDataService.getByType('gameType').then(function(data){
        $scope.gameType = data;
    });
    //游戏平台
    BaseDataService.getByType('platform').then(function(data){
        $scope.platform = data;
    });
    //成色
    BaseDataService.getByType('quality').then(function(data){
        $scope.quality = data;
    });
    //交易方式
    BaseDataService.getByType('tradingWay').then(function(data){
        $scope.tradingWay = data;
    });
    //版本
    BaseDataService.getByType('edition').then(function(data){
        $scope.edition = data;
    });

    var businessForm = {};
    $scope.businessForm = businessForm;

    $scope.add = function(){
        BusinessService.add(businessForm);
    };

}])
.controller('RouteDeferMsgCtl',['$scope','deferMsg',function($scope,deferMsg){
    $scope.deferMsg = deferMsg;
}])
.controller('RouteLoginCtl',['$scope','$location','LoginService',function($scope,$location,LoginService){
    var form = {};
    $scope.form = form;

    $scope.login = function(isValid){
        if(isValid) {
            LoginService.login($scope.form).then(function(data){
                if(data.hasLogin){
                    $location.path("/");
                }
            })
        }else{
            angular.forEach($scope.loginForm,function(e){
                if(typeof(e) == 'object' && typeof(e.$dirty) == 'boolean'){
                    e.$dirty = true;
                }
            });
        }
    };
}])
.controller('RouteRegisterCtl',['$scope','RegisterService',function($scope,RegisterService){
    var user = {};
    $scope.user = user;
    $scope.register = function(){
        if($scope.registerForm.$valid && $scope.checkMatch()) {
            RegisterService.register($scope.user).then(function(data) {
                $scope.registerForm.userName.$error.unique = false;
                $scope.registerForm.nickName.$error.unique = false;
                //$scope.registerForm.kaptcha.$error.invalid = false;
                if(data.status == Status.SUCCESS){
                    location.href = '/';
                }else if(data.status == Status.USERNAME_DUPLICATE){
                    $scope.registerForm.userName.$error.unique = true;
                }else if(data.status == Status.NICKNAME_DUPLICATE){
                    $scope.registerForm.nickName.$error.unique = true;
                //}else if(data.status == Status.CAPTCHA_INVALID){
                //    $scope.registerForm.kaptcha.$error.invalid = true;
                }
            });
        }else{
            angular.forEach($scope.user,function(e){
                if(typeof(e) == 'object' && typeof(e.$dirty) == 'boolean'){
                    e.$dirty = true;
                }
            });
        }
    }

    /*$scope.validExists = function(){
        if($scope.user.userName){
            RegisterService.remoteValid($scope.user.userName).then(function(data) {
                if(data.status == Status.FAILED()){
                    $scope.registerForm.userName.$error.unique = true;
                    $scope.registerForm.$invalid = true;
                    $scope.registerForm.$valid = false;
                }else{
                    $scope.registerForm.userName.$error.unique = false;
                }
            });
        }
    };*/

    $scope.checkMatch = function(){
        var user = $scope.user;
        if(user.password && user.passwordConfirm ){
            if(user.password != user.passwordConfirm){
                $scope.registerForm.passwordConfirm.$error.match=true;
                return false;
            }
        }
        $scope.registerForm.passwordConfirm.$error.match=false;
        return true;
    }

    $scope.changeCaptcha = function($event) {//生成验证码
        $event.target.src = '/ajax/base/captcha-image?' + Math.floor(Math.random()*100);
    };
}])
.controller('HomeController',['$scope','$location','LoginService',function($scope,$location,LoginService) {
    var loginInfo = LoginService.getLoginInfo();

    LoginService.autoLogin().then(function(data){
        //路由权限验证
        $scope.$on('$routeChangeStart', function(scope, next, current) {
            var needPermission = next.$$route.needPermission;
            if(needPermission && !LoginService.getLoginInfo().hasLogin){
                $location.path('/login');
            }
        });

        $scope.loginInfo = loginInfo;
    });

    $scope.toRegister = function(){
        $location.path('register');
    };

    $scope.toLogin = function(){
        $location.path('login');
    };

    $scope.toLogoff = function(){
        LoginService.logOff();
    };

}]);
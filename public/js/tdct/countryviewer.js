/**
 * Created by FunkySoya on 2015/4/4.
 */
function CountryListCtrl($scope,$http) {
    $http.get("/country/all")
        .success(function(response) {$scope.countries = response;});
    $scope.showEdit = true;
    $scope.master = {};
}

var app = angular.module("app", []);

app.directive("edit",function($document){
    return{
        restrict: 'AE',
        require: 'ngModel',
        link: function(scope,element,attrs,ngModel){
            element.bind("click",function(){
                var id = "txt_name_" +ngModel.$modelValue.code;
                scope.$apply(function(){
                    angular.copy(ngModel.$modelValue,scope.master);
                })
                console.log(id);
                var obj = $("#"+id);
                obj.removeClass("inactive");
                obj.addClass("active");
                obj.removeAttr("readOnly");
                scope.$apply(function(){
                    scope.showEdit = false;
                })
            });
        }
    }
});

app.directive("cancel",function($document){
    return{
        restrict: 'AE',
        require: 'ngModel',
        link: function(scope,element,attrs,ngModel){
            element.bind("click",function(){
                var id = "txt_name_" +ngModel.$modelValue.code;
                scope.$apply(function(){
                    angular.copy( scope.master,ngModel.$modelValue);
                })
                var obj = $("#"+id);
                obj.removeClass("active");
                obj.addClass("inactive");
                obj.attr("readonly","readonly");
                scope.$apply(function(){
                    scope.showEdit = true;
                })
            });
        }
    }
});
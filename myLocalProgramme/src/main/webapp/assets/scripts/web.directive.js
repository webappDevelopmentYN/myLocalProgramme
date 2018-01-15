/**
 * Created by wuhaiying on 2016/10/14.
 */
angular.module('myWebGroupApp',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $injector, $httpProvider){
    $urlRouterProvider.otherwise('story');
    $stateProvider
        .state('story',{
            url:"tpl/story",
            templateUrl:"tpl/story.html"
        })
        .state('cssTyped',{
            url:"tpl/cssTyped",
            templateUrl:"tpl/cssTyped.html"
        })
        .state('suspension',{
            url:"tpl/suspension",
            templateUrl:"tpl/suspension.html"
        });
})
//    .run(['$rootScope'],function($rootScope){
//    $rootScope.$on('$viewContentLoaded',function(){
//        $rootScope.stateEvents='loaded';
//        console.log(123);
//    })
//
//});


angular.bootstrap(document, ['myWebGroupApp']);
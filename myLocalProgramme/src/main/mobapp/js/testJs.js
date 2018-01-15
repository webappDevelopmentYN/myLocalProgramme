/**
 * Created by wuhaiying on 2017/1/13.
 */
(function(){
    'use strict';
    angular
        .module('staticdocApp')
        .controller('testController',testController);
    testController.$inject = ['$scope'];
    function testController($scope){
        $scope.test = function(){
            console.log(123);
        };
        $scope.myStyle = 'leftDropdownWidth';
        /*自定义数组*/
        $scope.arrayList = ['array1','array2','array3'];
    }
})();

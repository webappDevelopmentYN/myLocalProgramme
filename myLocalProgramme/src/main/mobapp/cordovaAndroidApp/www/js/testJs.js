/**
 * Created by wuhaiying on 2017/1/13.
 */
(function(){
    'use strict';
    angular
        .module('staticdocApp')
        .controller('anglarTestCtrl',anglarTestCtrl)
        .controller('parentCtrlOne',parentCtrlOne)
        .controller('childCtrl',childCtrl)
        .controller('parentCtrlTwo',parentCtrlTwo);
    anglarTestCtrl.$inject = ['$scope'];
    parentCtrlOne.$inject = ['$scope'];
    childCtrl.$inject = ['$scope'];
    parentCtrlTwo.$inject = ['$scope'];
    function anglarTestCtrl($scope){
        $scope.$on('to-child',function(e, d){
            console.log('没我啥事',d);
        });
        $scope.$on('to-parent',function(e, d){
            console.log('我是最外面的父亲，我收到to-parent事件了',d);
        });
        $scope.preview = function(){
            console.log('previewPhoto');
        }
        $scope.delete = function($event){
            $event.stopPropagation();
            console.log('deletePhoto');
        }
    }
    function parentCtrlOne($scope){
        $scope.click = function(){
            //广播/发送一个"to-child"事件$broadcast
            $scope.$broadcast('to-child','haha');
            //接受一个"to-child"事件$on
            $scope.$on('to-child',function(e, d){
                console.log('我接受到to-child事件了',d);
            });
            //广播/发送一个"to-child"事件$emit
            $scope.$emit('to-parent','么么哒');
            //接受一个"to-parent"事件$on
            $scope.$on('to-parent',function(e, d){
                console.log('我接受到to-parent事件了',d);
            })
        }
    }
    function childCtrl($scope){
        $scope.$on('to-child',function(e, d){
            console.log('我是第一个父级下的孩子Ctrl','hehe');
        });
        $scope.$on('to-parent',function(e, d){
            console.log('跟我没关系',d);
        })
    }
    function parentCtrlTwo($scope){
        $scope.clickTwo = function(e,d){
            console.log('都没我啥事','呜呜');
        };
        $scope.$on('to-child',function(e, d){
            console.log('也没我啥事','呜呜');
        });
        $scope.$on('to-parent',function(e, d){
            console.log('跟我也没关系',d);
        })
    }
})();

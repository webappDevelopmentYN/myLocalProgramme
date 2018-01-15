/**
 * Created by wuhaiying on 2017/2/22.
 */
/*瀑布流加载*/
(function() {
    'use strict';
    angular
        .module('staticdocApp')
        .controller('infiniteScrollTotalCtrl',infiniteScrollTotalCtrl);
    infiniteScrollTotalCtrl.$inject = ['$scope','$http','$timeout'];
    function infiniteScrollTotalCtrl($scope, $http, $timeout){
        $scope.isMoreData = true;
        $scope.page = 1;
        $scope.pageSize = 10;
        $scope.moreDataCanBeLoaded = function () {
            return $scope.isMoreData;
        };
        $scope.getItems = function(num){
            $http.get('js/infinite_scrolling/data.json')
                .success(function(items){
                    var len = items.length,flag = len > num;
                    items.length = flag?num:len;
                    $scope.items = angular.copy(items);
                    $timeout(function(){
                        //待载入数据后，广播或发送scroll.infiniteScrollComplete事件，告诉指令我们完成了这个动作
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.isMoreData = flag;
                    },2000);
                })
        };
        $scope.getItems($scope.pageSize*$scope.page);

        //doRefresh
        $scope.doRefresh = function(){
            $scope.page = 1;
            $scope.items = $scope.getItems($scope.pageSize*$scope.page);
            $scope.$broadcast('scroll.refreshComplete');
        };

        //loadMore
        $scope.loadMore = function(){
            $scope.page++;
            $scope.getItems($scope.pageSize*$scope.page);
        };
        // 上滑事件状态改变时，执行加载更多
        $scope.$on('stateChangeSuccess', function() {
            $scope.loadMore();
        });
    }

})();

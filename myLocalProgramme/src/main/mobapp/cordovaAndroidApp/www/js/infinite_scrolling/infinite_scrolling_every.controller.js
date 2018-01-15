/**
 * Created by wuhaiying on 2017/2/22.
 */
/*瀑布流加载*/
(function() {
    'use strict';
    angular
        .module('staticdocApp')
        .controller('infiniteScrollEveryCtrl',infiniteScrollEveryCtrl);
    infiniteScrollEveryCtrl.$inject = ['$scope','$http','$timeout'];
    function infiniteScrollEveryCtrl($scope, $http, $timeout){
        $scope.isMoreData = true;
        $scope.page = 1;
        $scope.items = [];
        $scope.moreDataCanBeLoaded = function () {
            return $scope.isMoreData;
        };
        $scope.getItems = function(){
            $http.get('js/infinite_scrolling/data' + $scope.page + '.json')
                .success(function(items){
                    $scope.items = items
                })
        };
        $scope.items = $scope.getItems();
        //doRefresh
        $scope.doRefresh = function(){
            $scope.page = 1;
            $http.get('js/infinite_scrolling/data' + $scope.page + '.json')
                .success(function(items){
                    $scope.items = items;
                    $scope.isMoreData =true;
                })
                .finally(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                })
        };

        //loadMore
        $scope.loadMore = function(){
            $scope.page++;
            if($scope.page > 3){
                $scope.isMoreData = false;
                return;
            }
            $http.get('js/infinite_scrolling/data' + $scope.page + '.json')
                .success(function(items){
                    $timeout(function(){
                        $scope.items = $scope.items.concat(items);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    },2000);

                })
        };
        // 上滑事件状态改变时，执行加载更多
        $scope.$on('stateChangeSuccess', function() {
            $scope.loadMore();
        });
    }

})();

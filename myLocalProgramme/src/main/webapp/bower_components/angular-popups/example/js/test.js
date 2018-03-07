/**
 * Created by yineng on 2018/1/15.
 */
angular.module('examples', ['angular-popups'])
    .controller('myCtrl',['$scope','$document',function($scope,$document){
        $scope.test = function(){
            console.log(123);
        };
        console.log($document);
        $scope.itemObj = [
            1,2,3,4,5
        ];
        $scope.nw = {
            open:false,
            nwClick : function(){
                var body =angular.element('body');
                var popEle = angular.element('.ui-popup');
                console.log(popEle.html());
            }
        };
    }]);
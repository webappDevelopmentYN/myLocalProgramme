/**
 * Created by wuhaiying on 2017/2/28.
 */
(function() {
    'use strict';
    angular
        .module('staticdocApp')
        .controller('popupCtrl',popupCtrl);
    popupCtrl.$inject = ['$scope','$ionicPopup','$ionicLoading','$timeout'];
    function popupCtrl($scope, $ionicPopup,$ionicLoading, $timeout){
        $scope.showPopup = function(){
            var myPopup = $ionicPopup.show({
                template:'<ion-content><textarea rows="6"></textarea></ion-content>',
                title:'这是头部',
                buttons:[
                    {
                        text:'取消',
                        type:'button button-local button-default'
                    },
                    {
                        text:'确定',
                        type:'button button-local button-theme'
                    }
                ]
            })
        };
        $scope.showLoad = function(){
          $ionicLoading.show({
            template: '<ion-spinner class="spinner-theme"></ion-spinner><h4 class="text-theme">加载中</h4>'
            //duration: 3000
          }).then(function(){
            console.log("The loading indicator is now displayed");
          });
        }
    }
})();

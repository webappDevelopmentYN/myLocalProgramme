/**
 * Created by wuhaiying on 2017/12/26.
 */
angular.module('docApp',['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/text');
        $stateProvider
            .state('text', {
                url: "/text",
                templateUrl: 'templates/text.html'
            })
            .state('popup_angular', {
                url: "/popup_angular",
                templateUrl: 'templates/popup_angular.html'
            });
    })
    .controller('myCtrl',['$scope',function($scope){
        $scope.config = {
            showStyle: 'click',
            title: '',
            replaceTpl:'<div ng-click="clickData.test()">这里面可以放很多事件</div>',
            clickData : {
                test : function(){
                    console.log('我来瞅瞅');
                }
            }
        };
        $scope.config1 = {
            showStyle: 'mouseover',
            title: '',
            replaceTpl:'<div ng-repeat="item in clickData.itemGroup" ng-click="clickData.test( item)">{{item}}</div>',
            clickData : {
                test : function( item){
                    console.log( item);
                },
                itemGroup:[1,2,3,4,5]
            }
        };
    }])
    .directive('hLight',[function(){
        return{
            restrict : 'C',
            link : function(scope , elem , attr){
                var markdownString = elem.val();
                marked.setOptions({
                    highlight: function(code){
                        return hljs.highlightAuto(code).value;
                    }
                });
                elem.replaceWith(marked(markdownString));
            }
        }
    }])
    .directive('uiBubble',function($document, $compile){
        return{
            restrict : 'A',
            scope:{defaultConfig : '='},
            link : function(scope, elem, attr){
                //初始化配置信息
              var defaultConfig = {
                    showStyle: 'click',
                    title: '默认提示信息',
                    replaceTpl:''
                };
                //整合配置信息
                var getDefaultConfig = function(){
                    return scope.defaultConfig ? angular.extend(defaultConfig , scope.defaultConfig) : defaultConfig;
                };
                //获取随机数
                var getMath = function(max){
                    max = max || 1e12;
                    return Math.floor(Math.random() * max)
                };
                //获取悬浮框模板
                var getPopElem = function (title ,replaceTpl){
                    return  '<div class="ui-popup ui-popup-right ui-popup-anchor">'+
                        '<div class="ui-bubble">' +
                        title +
                        '<div class="ui-bubble-content">'+
                        '<div>' + replaceTpl + '</div>' +
                        '</div>'+
                        '</div>'+
                        '</div>';
                };
                var bubbleId = 'uiBubble' + getMath();
                var config = getDefaultConfig();
                var uiPopupDom = angular.element( getPopElem(config.title,config.replaceTpl));
                if (config.showStyle) {
                    elem.on(config.showStyle, function(e){
                        scope.clickData = getDefaultConfig().clickData;
                        var left = elem.offset().left + elem.width() + 10;
                        var top = elem.offset().top + (elem.height()/2 - (uiPopupDom.height()/2));
                        uiPopupDom.prop('id',bubbleId).offset({left: left,top: top}).show();
                        uiPopupDom.appendTo(angular.element('body'));
                        $compile(uiPopupDom)(scope);
                        scope.$apply();
                        e.stopPropagation();
                    });
                    //关闭函数
                    //function close(e){
                    //    if()
                    //}
                    if (config.showStyle == "mouseover") {
                        elem.on('mouseout', function () {
                            angular.element('#'+bubbleId).remove();
                        });
                    } else {
                        $document.click(function () {
                            angular.element('#'+bubbleId).remove();
                        });
                    }
                }

                //elem.on({
                //    'mouseover':function (){
                //        var bubbleContent = attr.uiBubble || '悬浮泡泡';
                //        var uibubbleTemplate = '<div class="ui-popup ui-popup-right ui-popup-anchor">'+
                //            '<div class="ui-bubble">'+
                //            '<div class="ui-bubble-content">'+
                //            bubbleContent +
                //            '</div>'+
                //            '</div>'+
                //            '</div>';
                //        uibubbleTemplate = angular.element(uibubbleTemplate).appendTo(angular.element('body'));
                //        console.log(uibubbleTemplate);
                //        var left = elem.offset().left + elem.width() + 10;
                //        var top = elem.offset().top + (elem.height()/2 - (uibubbleTemplate.height()/2));
                //        uibubbleTemplate.prop('id','uiBubble')
                //            .offset({left: left,top: top})
                //            .show();
                //    },
                //    'mouseout':function(){
                //        angular.element('#uiBubble').remove();
                //    }
                //});
            }
        }
    });

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
            replaceTpl:'<div ng-click="clickData.test()" style="width: 400px;">这里面可以放很多事件</div>',
            clickData : {
                test : function(){
                    console.log('我来瞅瞅');
                }
            }
        };
        $scope.config1 = {
            showStyle: 'click',
            title: '',
            replaceTpl:'<div ng-repeat="item in clickData.itemGroup" ng-click="clickData.test( item)">{{item}}</div>',
            clickData : {
                test : function( item){
                    console.log( item);
                },
                itemGroup:[1]
            }
        };
        $scope.config2 = {
            showStyle: 'click',
            title: '',
            on: "fadklfjadjfklajsdklfasdjfkadsfaldksfjadf",
            replaceTpl:'<div style="height: 200px; cursor: pointer">高度设置为200px<ul><li ng-repeat="item in clickData.itemGroup" ng-click="clickData.test(item)">{{item.number}}</li></ul></div>',
            clickData : {
                test : function( item){
                    item.number = item.number + 1;
                },
                itemGroup:[{number: 1},{number: 2},{number: 3},{number: 4},{number: 5}]
            }
        };

        $scope.$on( $scope.config2.on, function(event, obj){
            $scope.config2.clcickFun = obj;
        });

        $scope.clickFun = function() {
            if ( $scope.config2.clcickFun && angular.isFunction( $scope.config2.clcickFun)) {
                $scope.config2.clcickFun();
            }
        }
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
                    return  '<div class="ui-popup ui-popup-anchor">'+
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
                $compile(uiPopupDom)(scope);
                var fun = function() {
                    scope.clickData = getDefaultConfig().clickData;
                    var elementOffsetTop = elem.offset().top,
                        elementOffsetLeft = elem.offset().left;
                    var uiPopupDomOffsetTop = elementOffsetTop + elem.outerHeight();
                    var availableHeight = angular.element(window).height() + angular.element('body').scrollTop() - uiPopupDomOffsetTop;
                    var availableTopHeight = elementOffsetTop;
                    var availableLeftWidth = elementOffsetLeft + elem.outerWidth();
                    var availableRightWidth = angular.element(window).width() - availableLeftWidth;
                    var left = elem.offset().left + elem.width()/2;
                    var top = elem.offset().top + elem.height()/2;
                    uiPopupDom.appendTo(angular.element('body'));
                    var uiPopupDomNew = uiPopupDom.prop('id',bubbleId);
                    uiPopupDomNew.offset({top: uiPopupDomOffsetTop, left: left});
                    //判断悬浮框展示的位置
                    if (availableHeight < uiPopupDom.outerHeight() && availableTopHeight > uiPopupDom.outerHeight() && availableRightWidth > uiPopupDom.outerWidth()) {
                        uiPopupDomOffsetTop = uiPopupDomOffsetTop - uiPopupDom.outerHeight() - elem.outerHeight();
                        uiPopupDomNew.addClass('ui-popup-top');
                        uiPopupDomNew.offset({top: uiPopupDomOffsetTop, left: left}).show();
                    }else if(availableRightWidth > uiPopupDom.outerWidth()){
                        uiPopupDomNew.addClass('ui-popup-right');
                        uiPopupDomNew.offset({top: top, left: availableLeftWidth});
                    }else if(availableRightWidth < uiPopupDom.outerWidth()){
                        uiPopupDomNew.addClass('ui-popup-left');
                        uiPopupDomNew.offset({top: top, left: elementOffsetLeft- uiPopupDom.outerWidth()});
                    }else{
                        uiPopupDomNew.addClass('ui-popup-bottom');
                    }

                    scope.$apply();
                    //elem.stopPropagation();
                };
                if ( config.on) {
                    scope.$emit( config.on, fun);
                }
                if (config.showStyle) {
                    elem.on(config.showStyle, function(){
                        fun();
                    });
                    //if (config.showStyle == "mouseover") {
                    //    elem.on('mouseout', function () {
                    //        angular.element('#'+bubbleId).remove();
                    //    });
                    //} else {
                    //    $document.click(function () {
                    //        angular.element('#'+bubbleId).remove();
                    //    });
                    //}
                }
            }
        }
    });

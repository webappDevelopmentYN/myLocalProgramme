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
            })
            .state('bubble', {
                url: "/bubble",
                templateUrl: 'templates/bubble.html'
            });
    })
    .controller('myCtrl',['$scope',function($scope){
        $scope.clickTest = function(){
            console.log("被点击了");
        };
        $scope.array = [1,2,3];
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
    })
    .directive('bubble',function($compile){
        return{
            template: '<div class="ui-popup ui-popup-anchor">' +
            '<div class="ui-bubble">' +
            '<div ng-transclude class="ui-bubble-content"></div>' +
            '</div>' +
            '</div>',
            restrict:'AE',
            transclude: true,
            replace: true,
            scope:{
                'ngIf': '=',
                'ngShow': '=',
                'ngHide': '=',
                //吸附到指定 ID 元素
                'for': '@',
                'close': '&',
                //关闭悬浮框动作
                'closeAction': '@',
                // 显示持续时间
                'duration': '@'
            },
            controller:['$scope',function($scope){
                // 默认的触发关闭动作
                this.closeAction = ['esc', 'timeout'];

                this.close = function(isEvent){
                    $scope.close();
                    if(isEvent){
                        $scope.$apply();
                    }
                }

            }],
            link: function(scope, elem, attrs, controller) {
                var $ = angular.element;
                var noop = function() {};
                var popup = {
                    node:elem[0],
                    showElement: noop,
                    hideElement: noop,
                    removeElement: noop
                };
                var temp = fix(elem);
                var $document = $(document);

                if (attrs.closeAction) {
                    controller.closeAction = attrs.closeAction.split(/\s+/);
                }

                // 模型同步UI显示、隐藏事件
                if (attrs.ngIf) scope.$watch('ngIf', change);
                if (attrs.ngShow) scope.$watch('ngShow', change);

                elem.one('$destroy', function() {
                    change(false);
                    popup.remove();
                    temp.remove();
                });

                // UI的显示与隐藏、删除事件
                function change(open){
                    var anchor = getAnchor(attrs['for']);
                    if (open) {
                        // 使用 setTimeout 等待 ng-show 在 UI 上生效
                        elem.css('visibility', 'hidden');
                        setTimeout(function() {
                            elem.css('visibility', 'visible');
                            setEvent(open);
                        }, 0);
                    } else {
                        popup.close();
                        setEvent(open);
                    }
                }

                function getAnchor(id) {
                    return document.getElementById(id);
                }

                // ESC 快捷键关闭悬浮框
                function esc(event){
                    var target = event.target;
                    var nodeName = target.nodeName;
                    var rinput = /^input|textarea$/i;
                    var isBlur = elem[0];
                    var isInput = rinput.test(nodeName) && target.type !== 'button';
                    var keyCode = event.keyCode;

                    // 避免输入状态中 ESC 误操作关闭
                    if (!isBlur || isInput) {
                        return;
                    }
                    if (keyCode === 27) {
                        controller.close(event);
                    }
                }

                // 外部点击关闭
                function outerclick(event) {
                    if (!elem[0].contains(event.target)) {
                        controller.close(event);
                    }
                }

                // 定时关闭
                function timeout() {
                    if (attrs.duration) {
                        timeout.timer = setTimeout(function() {
                            controller.close(true);
                        }, Number(attrs.duration));
                    }
                }

                function setEvent(open) {
                    controller.closeAction.forEach(function(action) {
                        switch (action) {
                            case 'esc':
                                if (open) {
                                    $document.on('keydown', esc);
                                } else {
                                    $document.off('keydown', esc);
                                }
                                break;
                            case 'timeout':
                                if (open) {
                                    timeout();
                                } else {
                                    clearTimeout(timeout.timer);
                                }
                                break;
                            case 'outerchick':
                                if (open) {
                                    $document
                                        .on('ontouchend', outerclick)
                                        .on('click', outerclick);
                                } else {
                                    $document
                                        .off('ontouchend', outerclick)
                                        .off('click', outerclick);
                                }
                                break;
                            case 'click':
                                //case 'focusout': // Error: [$rootScope:inprog]
                                if (open) {
                                    elem.on(action, controller.close);
                                } else {
                                    elem.off(action, controller.close);
                                }
                                break;
                        }
                    });
                }

            }
        }
    });
function fix(elem) {
    var temp = document.createElement('popup');
    document.body.appendChild(temp);
    temp.appendChild(elem[0]);
    return $(temp);
}

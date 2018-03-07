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
            })
            .state('img_resize_auto',{
                url: "/img_resize_auto",
                templateUrl: 'templates/img_resize_auto.html'
            });
    })
    .controller('myCtrl',['$scope',function($scope){
        $scope.load = function() {
            console.log('code here');
        };
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
        };

        $scope.click = function(event){
            console.log(event);
        };

        /*图片随外框自适应*/
        function resizeImgNew(pic,w,h){//参数
            var re_new_size=function(r){
                //根据比率重新计算宽度
                return {w:pic.width/r,h:pic.height/r};
            };
            var re_offset=function(n){
                //根据新的宽高度返回偏移量
                return {off_l:(n.w-w)*0.5,off_t:(n.h-h)*0.5};
            };
            var re_position=function(o,n){
                //重新定位图片
                pic.style.cssText="top:"+-o.off_t+"px;left:"+-o.off_l+"px;width:"+n.w+"px;height:"+n.h+"px;";
            };
            var execute=function(rate){//总执行函数
                var new_size=re_new_size(rate),
                    offset_new=re_offset(new_size);
                re_position(offset_new,new_size);
            };

            //判断变量
            var rate_of_w=pic.width/w,
                rate_of_h=pic.height/h,
                rate;
            if(rate_of_w>=1){
                //图片宽度大于显示区域宽度
                if(rate_of_h>=1){
                    //且图片高度大于显示区域高度
                    rate=Math.min(rate_of_w,rate_of_h);
                }else{
                    //图片高度小于显示区域
                    rate=pic.height/h;
                }
            }else{
                //图片宽度小于显示区域宽度
                if(rate_of_h>=1){
                    //且图片高度大于显示区域高度
                    rate=pic.width/w;
                }else{
                    //图片高度小于显示区域高度
                    rate=Math.min(rate_of_w,rate_of_h);
                }
            }
            execute(rate);
            //执行入口
        }
        resizeImgNew();

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

                    //scope.$apply();
                    elem.stopPropagation();
                };
                //if ( config.on) {
                //    scope.$emit( config.on, fun);
                //}
                if (config.showStyle) {
                    elem.on(config.showStyle, function(){
                        fun();
                    });
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
            }
        }
    })
    //.directive('bubble',function($compile){
    //    return{
    //        template: '<div class="ui-popup ui-popup-anchor">' +
    //        '<div class="ui-bubble">' +
    //        '<div ng-transclude class="ui-bubble-content"></div>' +
    //        '</div>' +
    //        '</div>',
    //        restrict:'AE',
    //        transclude: true,
    //        replace: true,
    //        scope:{
    //            'ngIf': '=',
    //            'ngShow': '=',
    //            'ngHide': '=',
    //            //吸附到指定 ID 元素
    //            'for': '@',
    //            'close': '&',
    //            //关闭悬浮框动作
    //            'closeAction': '@',
    //            // 显示持续时间
    //            'duration': '@'
    //        },
    //        controller:['$scope',function($scope){
    //            // 默认的触发关闭动作
    //            this.closeAction = ['esc', 'timeout'];
    //
    //            this.close = function(isEvent){
    //                $scope.close();
    //                if(isEvent){
    //                    $scope.$apply();
    //                }
    //            }
    //
    //        }],
    //        link: function(scope, elem, attrs, controller) {
    //            var $ = angular.element;
    //            var noop = function() {};
    //            var popup = {
    //                node:elem[0],
    //                showElement: noop,
    //                hideElement: noop,
    //                removeElement: noop
    //            };
    //            var temp = fix(elem);
    //            var $document = $(document);
    //
    //            if (attrs.closeAction) {
    //                controller.closeAction = attrs.closeAction.split(/\s+/);
    //            }
    //
    //            // 模型同步UI显示、隐藏事件
    //            if (attrs.ngIf) scope.$watch('ngIf', change);
    //            if (attrs.ngShow) scope.$watch('ngShow', change);
    //
    //            elem.one('$destroy', function() {
    //                change(false);
    //                popup.remove();
    //                temp.remove();
    //            });
    //
    //            // UI的显示与隐藏、删除事件
    //            function change(open){
    //                var anchor = getAnchor(attrs['for']);
    //                if (open) {
    //                    // 使用 setTimeout 等待 ng-show 在 UI 上生效
    //                    elem.css('visibility', 'hidden');
    //                    setTimeout(function() {
    //                        elem.css('visibility', 'visible');
    //                        setEvent(open);
    //                    }, 0);
    //                } else {
    //                    popup.close();
    //                    setEvent(open);
    //                }
    //            }
    //
    //            function getAnchor(id) {
    //                return document.getElementById(id);
    //            }
    //
    //            // ESC 快捷键关闭悬浮框
    //            function esc(event){
    //                var target = event.target;
    //                var nodeName = target.nodeName;
    //                var rinput = /^input|textarea$/i;
    //                var isBlur = elem[0];
    //                var isInput = rinput.test(nodeName) && target.type !== 'button';
    //                var keyCode = event.keyCode;
    //
    //                // 避免输入状态中 ESC 误操作关闭
    //                if (!isBlur || isInput) {
    //                    return;
    //                }
    //                if (keyCode === 27) {
    //                    controller.close(event);
    //                }
    //            }
    //
    //            // 外部点击关闭
    //            function outerclick(event) {
    //                if (!elem[0].contains(event.target)) {
    //                    controller.close(event);
    //                }
    //            }
    //
    //            // 定时关闭
    //            function timeout() {
    //                if (attrs.duration) {
    //                    timeout.timer = setTimeout(function() {
    //                        controller.close(true);
    //                    }, Number(attrs.duration));
    //                }
    //            }
    //
    //            function setEvent(open) {
    //                controller.closeAction.forEach(function(action) {
    //                    switch (action) {
    //                        case 'esc':
    //                            if (open) {
    //                                $document.on('keydown', esc);
    //                            } else {
    //                                $document.off('keydown', esc);
    //                            }
    //                            break;
    //                        case 'timeout':
    //                            if (open) {
    //                                timeout();
    //                            } else {
    //                                clearTimeout(timeout.timer);
    //                            }
    //                            break;
    //                        case 'outerchick':
    //                            if (open) {
    //                                $document
    //                                    .on('ontouchend', outerclick)
    //                                    .on('click', outerclick);
    //                            } else {
    //                                $document
    //                                    .off('ontouchend', outerclick)
    //                                    .off('click', outerclick);
    //                            }
    //                            break;
    //                        case 'click':
    //                            //case 'focusout': // Error: [$rootScope:inprog]
    //                            if (open) {
    //                                elem.on(action, controller.close);
    //                            } else {
    //                                elem.off(action, controller.close);
    //                            }
    //                            break;
    //                    }
    //                });
    //            }
    //
    //        }
    //    }
    //})
    .directive('bubble',function(){
        return{
            template: '<div class="ui-popup ui-popup-anchor">' +
                      '   <div class="ui-bubble">' +
                      '      <div ng-transclude class="ui-bubble-content"></div>' +
                      '   </div>' +
                      '</div>',
            restrict: 'AE',
            transclude:true,
            replace:true,
            scope:false,
            link:function(scope, elem, attrs){
                //悬浮框元素位置展示
                var elemOffsetPos = function(data){
                    elem[0].style.position = 'absolute';
                    elem[0].style.left = (data.left) + 'px';
                    elem[0].style.top = (data.top) + 'px';
                };
                //默认悬浮框元素位置
                elemOffsetPos({left:0,top:0});

                /*设置弹出窗的位置信息*/
                var setPosition = function(triggerElem){
                    /* 弹出窗数据*/
                    var elemData = { width: elem.outerWidth(), height: elem.outerHeight()};
                    /* 操作元素的数据*/
                    var triggerElemData = { width: triggerElem.outerWidth(), height: triggerElem.outerHeight()};
                    var triggerOffset = triggerElem.offset();
                    /* window 页面数据*/
                    var windowData = angular.element(window);
                    /* body 内容数据*/
                    var bodyScrollHeight = angular.element("body").scrollTop();
                    /* 计算出的展示位置 */
                    var setElemData = {};
                    /* 计算展示位置 默认展示在右下方*/
                    /* 底部可用空间 = 页面总高度 + 滚动高度 - （元素距离顶部高度 + 元素高度 + 弹出窗高度）*/
                    var availableBottomHeight = windowData.height() - ( triggerOffset.top + triggerElemData.height);
                    /* 判断 底部可用空间是否满足弹出窗展示*/
                    if ( availableBottomHeight > elemData.height ) {
                        /* 如果底部可用空间满足弹出窗展示 */
                        /* 右侧可用空间 = 页面总宽度 - （元素距离左侧宽度 + 元素宽度/2 + 弹出窗宽度）*/
                        var availableRightWidth = windowData.width() - ( triggerOffset.left + triggerElemData.width/2);
                        /* 先判断 右侧可用空间是否满足弹出窗展示*/
                        if ( availableRightWidth > elemData.width) {
                            /* 右侧弹空间满足展示*/
                            elem.addClass('ui-popup-bottom');
                            setElemData.top = ( triggerOffset.top + triggerElemData.height + 5);
                            setElemData.left = ( triggerOffset.left + triggerElemData.width / 2);
                        } else {
                            /* 右侧弹出窗 不能满足展示 放在左侧*/
                            elem.addClass('ui-popup-left-bottom');
                            setElemData.top = ( triggerOffset.top + triggerElemData.height/2);
                            setElemData.left = ( triggerOffset.left - (elemData.width) - 5);
                        }
                    } else {
                        /* 如果底部可用空间不满足弹出窗展示 */
                        /* 右侧可用空间 = 页面总宽度 - （元素距离左侧宽度 + 元素宽度/2 + 弹出窗宽度）*/
                        var availableRightWidth = windowData.width() - ( triggerOffset.left + triggerElemData.width/2);
                        /* 先判断 右侧可用空间是否满足弹出窗展示*/
                        if ( availableRightWidth > elemData.width) {
                            /* 右侧弹空间满足展示*/
                            elem.addClass('ui-popup-top');
                            setElemData.top = ( triggerOffset.top - elemData.height - 5);
                            setElemData.left = ( triggerOffset.left + triggerElemData.width / 2);
                        } else {
                            /* 右侧弹出窗 不能满足展示 放在左侧*/
                            elem.addClass('ui-popup-left-top');
                            setElemData.top = ( triggerOffset.top - elemData.height + (triggerElemData.height/2));
                            setElemData.left = ( triggerOffset.left - (elemData.width) - 5 );
                        }
                    }
                    elemOffsetPos( setElemData);
                };

                //默认不展示元素
                elem[0].style.display = 'none';

                //声明一个变量 默认元素不展示
                var isShowPopup = false;

                /*关闭元素 方法*/
                var closePopup =function(){
                    setTimeout(function(){
                        if(!isShowPopup){
                            elem[0].style.display = 'none';
                        }
                    },100)
                };
                //判断事件是否是mouseover 鼠标滑动事件，如果是 就默认设置滑动事件方法
                var checkMouseover = function (action,triggerElem){
                    /*如果 是鼠标滑动事件 展示悬浮框 就设置滑动事件 和 滑动关闭事件*/
                    if(action == 'mouseover'){
                        /*给本身定义一个事件 避免全局方法 把本身的弹出窗关闭了*/
                        elem.on('mouseover',function(event){
                            isShowPopup = true;
                            event.stopPropagation();
                        });
                        triggerElem.on('click',function(event){
                            isShowPopup = true;
                            event.stopPropagation();
                        });
                        /*给悬浮框一个滑动事件 移动开鼠标就关闭悬浮框*/
                        elem.on('mouseleave',function(){
                            isShowPopup = false;
                            closePopup();
                        })
                    }
                };

                //定义全局方法 删除页面内所有悬浮框元素
                angular.element('html').on('click',function(){
                    isShowPopup = false;
                    closePopup();
                });
                //定义悬浮框元素本身click方法，避免使用内部点击事件时被全局方法关闭
                elem.on('click',function(event){
                    isShowPopup = true;
                    event.stopPropagation();
                });

                //监听 展示元素
                scope.$on("bubbleOpen" + attrs['bubbleid'],function(event, triggerElem, action){
                    //关闭其他悬浮框元素
                    scope.$emit('otherBubbleClose',{});

                    //设置悬浮窗 位置和高度
                    setPosition(triggerElem);

                    //展示元素
                    elem[0].style.display = 'block';

                    //判断是否为 滑动事件 如果是 就进行滑动事件处理配置
                    checkMouseover(action,triggerElem);

                });
                //监听 关闭元素
                scope.$on("bubbleClose" + attrs['bubbleid'],function(){
                    closePopup();
                });
                //重新申明一个关闭元素方法，当打开第二个元素时，其他悬浮框元素关闭
                scope.$on('otherBubbleClose',function(){
                    //不能直接调用closePopup方法，此方法的延时处理会关闭新打开的悬浮框元素
                    elem[0].style.display = 'none';
                });

            }
        }
    })
    .directive('bubbleaction',function(){
        return{
            restrict:'AE',
            scope:false,
            link:function(scope, elem, attrs){
                /*配置操作事件*/
                var action = attrs['bubbleaction'];
                var actionFun = function(){
                    elem.on(action,function(event){
                        event.stopPropagation();
                        scope.$broadcast("bubbleOpen" + attrs['bubbleid'], elem, action);
                        /*处理特殊情况 使用mouseover需要一个关闭事件*/
                        if(action == 'mouseover'){
                            elem.on('mouseleave',function(event){
                                event.stopPropagation();
                                scope.$broadcast('bubbleClose' + attrs['bubbleid'],elem)
                            })
                        }
                    });
                };
                //调用函数
                actionFun();
            }
        }
    });
//function fix(elem) {
//    var temp = document.createElement('popup');
//    document.body.appendChild(temp);
//    temp.appendChild(elem[0]);
//    return $(temp);
//}

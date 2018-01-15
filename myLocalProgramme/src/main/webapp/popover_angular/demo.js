    /**
        * Created by wuhaiying on 2016/9/9.
        */
        var pop = angular.module('pop',[]);
        pop.directive('wPopover', ['$window', function($window) {
        return {
        restrict: 'AE',
        template: '<div class="w-popover-wrap">'+
        '<div class="elemHover">'+
        '123456'+
        '<div class="w-popover right">' +
        '框在右下' +
        '<div class="arrow"></div></div></div></div>',
        replace: true,
        link: function(scope,elem){
        var windInfo = null;
        var getTotalNumber = function () {
        var totalNumber = {};
        //获取window可视区域的宽和高
        totalNumber.windowWidth=$window.innerWidth;//宽度
        totalNumber.windowHeight=$window.innerHeight;//高度
        //获取popover父亲盒子的宽和高
        totalNumber.popoverParentWidth=elem[0].offsetWidth;//popover's parent's width
        totalNumber.popoverParentHeight=elem[0].offsetHeight;//popover's parent's height
        totalNumber.boxLeft=elem[0].offsetLeft;//popover's parent's distance to window left
        var windowScrollHeight = angular.element(window).scrollTop();
        totalNumber.boxTop=elem[0].offsetTop-windowScrollHeight;//popover's parent's distance to window top
        //console.log('元素距离文档顶部的距离'+elem[0].offsetTop);
        //console.log('滑动的距离'+windowScrollHeight);
        //console.log('元素距离浏览器顶部的距离'+totalNumber.boxTop);
        totalNumber.boxRight=totalNumber.windowWidth-totalNumber.boxLeft-totalNumber.popoverParentWidth-15;//popover's parent's distance to window right
        totalNumber.boxBottom=totalNumber.windowHeight-totalNumber.boxTop;//popover's parent's distance to window bottom
        return totalNumber;
        };
        windInfo = getTotalNumber();

        angular.element($window).bind('resize',function(){
        windInfo = getTotalNumber();
        });
        angular.element($window).bind('scroll',function(){
        windInfo = getTotalNumber();
        });
        /*元素的鼠标hover事件*/
        elem.find('.elemHover').bind('mouseover',function() {
        //获取popover盒子以及宽高
        var popoverBox = elem.find('.w-popover'),
        popoverWidth = popoverBox[0].offsetWidth,
        popoverHeight = popoverBox[0].offsetHeight;
        if (windInfo.boxLeft < popoverWidth && windInfo.boxRight > popoverWidth) {
        if (windInfo.boxBottom > popoverHeight ||  windInfo.boxTop < popoverHeight) {
        elem.removeClass('right-top', 'left-top', 'left-bottom');
        elem.addClass('right-bottom');
        popoverBox.removeClass('left');
        popoverBox.addClass('right');
        } else if (windInfo.boxBottom < popoverHeight || windInfo.boxTop > popoverHeight) {
        elem.removeClass('right-bottom', 'left-top', 'left-bottom');
        elem.addClass('right-top');
        popoverBox.removeClass('left');
        popoverBox.addClass('right');
        }
        }else if (windInfo.boxLeft > popoverWidth  &&  windInfo.boxRight < popoverWidth) {
        if (windInfo.boxBottom > popoverHeight || windInfo.boxTop < popoverHeight ) {
        elem.removeClass('left-top', 'right-top', 'right-bottom');
        elem.addClass('left-bottom');
        popoverBox.removeClass('right');
        popoverBox.addClass('left');
        } else if (windInfo.boxBottom < popoverHeight || windInfo.boxTop > popoverHeight) {
        elem.removeClass('left-bottom', 'right-top', 'right-bottom');
        elem.addClass('left-top');
        popoverBox.removeClass('right');
        popoverBox.addClass('left');
        }
        }

        });
        }
        };
        }]);
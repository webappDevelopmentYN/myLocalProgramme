/**
 * Created by wuhaiying on 2016/12/26.
 */
//(function(){
//    'use strict';
//    angular
//        .module('staticdocApp')
//        .directive('dropdownDir', dropdownDir)
//        .controller('testController',testController)
//        testController.$inject = ['$scope'];
//    function dropdownDir(){
//        return{
//            restrict: 'A',
//            link: link
//        };
//        function link(scope, element, attrs){
//            var dropdownMenu = element.find('.dropdown-menu'),
//                dropdown = element.find('.dropdown'),
//                elementOffsetTop = dropdown.offset().top,
//                elementOffsetLeft = dropdown.offset().left,
//                elementWidth = dropdown.outerWidth();
//            /*悬浮框样式*/
//            var dropdownMenuOffsetTop = elementOffsetTop + dropdown.outerHeight()+1;
//            var availableHeight = angular.element(window).height + angular.element('body').scrollTop() - elementOffsetTop - dropdown.height();
//            if(availableHeight < dropdownMenuOffsetTop){
//                dropdownMenuOffsetTop = dropdownMenuOffsetTop - dropdownMenu.outerHeight() - dropdown.outerHeight();
//            }
//            scope.fullWidth = {
//                'left': '0',
//                'width': '100%'
//            };
//            scope.autoWidth = {
//                'left': elementOffsetLeft,
//                'width': elementWidth
//            };
//            function show(){
//                dropdownMenu.css({
//                    'position': 'fixed',
//                    'z-index':'1000',
//                    'top': dropdownMenuOffsetTop
//                }).show();
//                flag = true;
//            }
//            function hide(){
//                dropdownMenu.css({
//                    //'position': 'fixed',
//                    //'z-index':'1000',
//                    //'top': dropdownMenuOffsetTop
//                }).hide();
//                flag = false;
//            }
//
//
//            var flag = false;
//            element.on('click',function($event){
//                if (!flag) {
//                    show();
//                } else {
//                    hide();
//                }
//                $event.stopPropagation();
//            });
//
//            // add close Listener
//            document.removeEventListener('click', close, true);
//            document.addEventListener('click', close, false);
//
//            function close(e){
//                if (dropdownMenu && dropdownMenu.length && e && !angular.element(e.target).parents('.dropdown-menu').length) {
//                    hide();
//                }
//            }
//
//        }
//    }
//    function testController($scope){
//        $scope.test = function(){
//            console.log(456);
//        }
//    }
//
//})();
(function(){
    'use strict';
    angular
        .module('staticdocApp')
        .directive('dropdownSelectDir', dropdownSelectDir);
    function dropdownSelectDir(){
        return{
            restrict: 'A',
            link: link
        };
        function link(scope, element, attrs){
            var selectedMenu = element.find('selected-menu');
            var elementWidth = element.outerWidth(),
                elementHeight = element.outerHeight(),
                elementOffsetTop = element.offset().top,
                elementOffsetLeft = element.offset().left,
                selectedMenuHeight = angular.element(window).height() - elementHeight;
            console.log(elementOffsetTop);
            /*悬浮框样式*/
            var dropdownMenuOffsetTop = elementOffsetTop + elementHeight+1;
            var availableHeight = angular.element(window).height() - elementOffsetTop - elementHeight;
            console.log( elementOffsetTop+ elementHeight);
            console.log( availableHeight);
            console.log( dropdownMenuOffsetTop);
            if(availableHeight < dropdownMenuOffsetTop){
                dropdownMenuOffsetTop = elementOffsetTop;
                console.log(dropdownMenuOffsetTop);
            }
            if (scope.myStyle == 'autoWidth') {
                scope.menuWidthStyle = {
                    'left': elementOffsetLeft,
                    'width': elementWidth,
                    'height': selectedMenuHeight,
                    'top': dropdownMenuOffsetTop
                };
            } else if(scope.myStyle == 'fullWidth'){
                scope.menuWidthStyle = {
                    'left': '0',
                    'width': '100%',
                    'height': selectedMenuHeight,
                    'top': dropdownMenuOffsetTop
                };
            }else if(scope.myStyle == 'leftDropdownWidth'){
                scope.menuWidthStyle = {
                    'left': '0',
                    'max-width': '100%',
                    'height': selectedMenuHeight,
                    'top': dropdownMenuOffsetTop
                };
            }else if(scope.myStyle == 'rightDropdownWidth'){
                scope.menuWidthStyle = {
                    'right': '0',
                    'max-width': '100%',
                    'height': selectedMenuHeight,
                    'top': dropdownMenuOffsetTop
                };
            }
            element.on('click',function($event){
                if(element.hasClass('open')){
                    element.removeClass('open');
                }else{
                    element.addClass('open');
                }
                $event.stopPropagation();

            });
            // add close Listener
            document.removeEventListener('click', close, true);
            document.addEventListener('click', close, false);

            function close(){
                if (selectedMenu) {
                    element.removeClass('open')
                }
            }
        }
    }
})();

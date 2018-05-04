/**
 * Created by wuhaiying on 2018/5/2.
 */
(function(){
    'use strict';

    angular.module('docApp')
        .directive('roDropdown',roDropdown);
    roDropdown.$inject = [];

    function roDropdown(){
        return{
            restrict: 'EA',
            link: function(scope, element, attrs){
                console.log(456);
            }
        }
    }

})();
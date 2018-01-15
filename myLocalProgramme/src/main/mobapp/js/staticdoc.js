angular.module('staticdocApp',['ionic'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('/', {
                url: '/',
                templateUrl: 'views/home/home.html'
            })
            .state('/header', {
                url: '/header',
                templateUrl: 'views/model/header.html'
            })
            .state('/header_dropdown', {
                url: '/header_dropdown',
                templateUrl: 'views/model/header_dropdown.html',
                controller: 'testController'
            })
            .state('/button', {
                url: '/button',
                templateUrl: 'views/model/button.html'
            })
            .state('/tab', {
                url: '/tab',
                templateUrl: 'views/model/tab.html'
            })
            .state('/list_item', {
                url: '/list_item',
                templateUrl: 'views/model/list_item.html'
            })
            .state('/headerdemo1', {
                url: '/headerdemo1',
                templateUrl: 'views/header/demo1.html'
            })
            .state('/headerdemo2', {
                url: '/headerdemo2',
                templateUrl: 'views/header/demo2.html'
            });

        $urlRouterProvider.otherwise('/');
    });


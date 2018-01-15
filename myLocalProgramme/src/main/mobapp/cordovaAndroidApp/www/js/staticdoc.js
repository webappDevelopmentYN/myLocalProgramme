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
            .state('/button', {
                url: '/button',
                templateUrl: 'views/model/button.html'
            })
            .state('/header_dropdown', {
                url: '/header_dropdown',
                templateUrl: 'views/model/header_dropdown.html'
            })
            .state('/page_dropdown', {
                url: '/page_dropdown',
                templateUrl: 'views/model/page_dropdown.html'
            })
            .state('/form', {
                url: '/form',
                templateUrl: 'views/model/form.html'
            })
            .state('/tab', {
                url: '/tab',
                templateUrl: 'views/model/tab.html'
            })
            .state('/list_item', {
                url: '/list_item',
                templateUrl: 'views/model/list_item.html'
            })
            .state('/attachment', {
                url: '/attachment',
                templateUrl: 'views/model/attachment.html'
            })
            .state('/infinite_scrolling_total', {
                url: '/infinite_scrolling_total',
                templateUrl: 'views/model/infinite_scrolling_total.html',
                controller: 'infiniteScrollTotalCtrl'
            })
            .state('/infinite_scrolling_every', {
                url: '/infinite_scrolling_every',
                templateUrl: 'views/model/infinite_scrolling_every.html',
                controller: 'infiniteScrollEveryCtrl'
            })
            .state('/popup', {
                url: '/popup',
                templateUrl: 'views/model/popup.html',
                controller: 'popupCtrl'
            })
            .state('/angular_test', {
                url: '/angular_test',
                templateUrl: 'views/model/angular_test.html',
                controller: 'anglarTestCtrl'
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


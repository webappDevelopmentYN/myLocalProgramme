/**
 * Created by wuhaiying on 2016/11/8.
 */
angular.module('myAppGroup',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('filters');
        $stateProvider
            /*页面存在多种视图展示*/
            .state('filters',{
                url:'/filters',
                views: {
                    'filters': {
                        template: '<h1>HELLO WORLD</h1>'+ '<p>{{contact.title}}</p>',
                        controller: function(){
                            this.title = 'My Contacts';
                        },
                        controllerAs: 'contact'
                    },
                    'mailbox': {
                        templateUrl: 'tpl/mailbox.html'
                    },
                    'priority': {
                        templateUrl: 'tpl/priority.html'
                    }
                }
            })
            /*嵌套视图展示，别忘了改路由哦*/
            .state('filters.priority',{
                url: '/priority',
                template: '<p>其实我是视图中的视图</p>'
            });
    });
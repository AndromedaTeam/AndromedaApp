angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('tabsController.polling', {
        url: '/polling',
        views: {
            'tab1': {
                templateUrl: 'templates/polling.html',
                controller: 'pollingCtrl'
            }
        },
        authRequired: true
    })

    .state('tabsController.history', {
        url: '/history',
        views: {
            'tab2': {
                templateUrl: 'templates/history.html',
                controller: 'historyCtrl'
            }
        },
        authRequired: true
    })

    .state('tabsController.administration', {
        url: '/administration',
        views: {
            'tab3': {
                templateUrl: 'templates/administration.html',
                controller: 'administrationCtrl'
            }
        },
        authRequired: true
    })

    .state('tabsController', {
        url: '/tabs',
        templateUrl: 'templates/tabsController.html',
        abstract: true,
        authRequired: true
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
    })

    .state('profile', {
        url: '/profile',
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
    })

    .state('notifications', {
        url: '/notifications',
        templateUrl: 'templates/notifications.html',
        controller: 'notificationsCtrl'
    })


    $urlRouterProvider.otherwise('/login')



});
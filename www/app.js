// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var digitalVotingApp=angular.module('app', ['ionic', 'firebase']);

digitalVotingApp.config(function($ionicConfigProvider, $sceDelegateProvider,$stateProvider,$urlRouterProvider) {


    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

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


})

.run(function($ionicPlatform, $rootScope, $state) {
    $ionicPlatform.ready(function() {
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

        //stateChange event
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            var user = firebase.auth().currentUser;
            if (toState.authRequired && !user) { //Assuming the AuthService holds authentication logic
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
        });

        var config = {
            apiKey: "AIzaSyBdwwwXs7dQeKsFs5-KL-EGM_F1p_lkcZk",
            authDomain: "andromeda-9e149.firebaseapp.com",
            databaseURL: "https://andromeda-9e149.firebaseio.com",
            storageBucket: "andromeda-9e149.appspot.com",
            messagingSenderId: "34743106949"
        };
        firebase.initializeApp(config);
    });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

            function stopDrag() {
                $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag() {
                $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        link: function(scope, element, attrs) {
            var href = attrs['hrefInappbrowser'];

            attrs.$observe('hrefInappbrowser', function(val) {
                href = val;
            });

            element.bind('click', function(event) {

                window.open(href, '_system', 'location=yes');

                event.preventDefault();
                event.stopPropagation();

            });
        }
    };
});
angular.module('app.controllers', [])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('pollingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('historyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('administrationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('loginCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, $state, $ionicPopup) {

        // $scope.loginWithUserCredentials = function() {
        //     console.log("here");
        //     $state.transitionTo("tabsController.polling");
        // }


        $scope.user = {
            email: this.email,
            password: this.password
        };

        $scope.loginWithUserCredentials = function() {
            var email = this.user.email;
            var password = this.user.password;

            /* Check user fields*/
            if (!email || !password) {
                var errorMessage = "Email or Password is incorrect!!";
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops!',
                    template: errorMessage
                });
                return;
            }
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function(result) {
                    $state.transitionTo("tabsController.polling");
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var alertPopup = $ionicPopup.alert({
                        title: 'Oops!',
                        template: errorMessage
                    });
                });

        };

        $scope.loginGoogle = function() {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            // provider.setCustomParameters({
            //     'login_hint': 'user@example.com'
            // });
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
                var providerData = user.providerData[0];
                firebase.database().ref('users/' + providerData.displayName).set({ Email: providerData.email, PhotoURL: providerData.photoURL, uid: providerData.uid });
                console.log(user);
                //$state.go("tab.polling");
                $state.transitionTo("tabsController.polling");
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                var errorCode = error.code;
                var errorMessage = error.message;
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops!',
                    template: errorMessage
                });
            });
        }


        $scope.loginFacebook = function() {
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
                var providerData = user.providerData[0];
                firebase.database().ref('users/' + providerData.displayName).set({ Email: providerData.email, PhotoURL: providerData.photoURL, uid: providerData.uid });
                console.log(user);
                //$state.go("tab.polling");
                $state.transitionTo("tabsController.polling");
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                var errorCode = error.code;
                var errorMessage = error.message;
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops!',
                    template: errorMessage
                });
            });
        }

    }
])

.controller('signupCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $ionicPopup) {
        $scope.user = {
            name: this.name,
            email: this.email,
            password: this.password
        }
        $scope.signupWithEmail = function() {
            firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(result) {
                var providerData = result.providerData[0];
                firebase.database().ref('users/' + $scope.user.name).set({ Email: providerData.email, PhotoURL: providerData.photoURL, uid: providerData.uid });
                console.log(providerData);
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops!',
                    template: errorMessage
                });
            });
        }
    }
])



.controller('profileCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $ionicHistory) {

        $scope.doLogout = function() {
            firebase.auth().signOut().then(function() {
                // $ionicHistory.nextViewOptions({
                //     disableBack: true
                // });
                $state.transitionTo("login");
            }, function(error) {

            });
        }

    }
])

.controller('notificationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])
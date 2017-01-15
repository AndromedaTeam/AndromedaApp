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

.controller('administrationCtrl', ['$scope', '$stateParams', '$firebase', '$firebaseArray',
    function($scope, $stateParams, $firebase, $firebaseArray) {
        var ref = firebase.database().ref('users/');
        var list = $firebaseArray(ref);
        $scope.users = list;

        // $scope.user = firebase.auth().currentUser;
        // $scope.users = UserService.getAllUsers();

        $scope.listUsers = function() {
            console.log($scope.users);
        }

        // $scope.getUserById = function() {
        //     $scope.user = UserService.getUserById("106080231831178666577");
        //     console.log($scope.user);
        // }
    }
])

.controller('loginCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$ionicPopup', '$firebaseObject', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, $state, $ionicPopup, $firebaseObject) {

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
            firebase.database().ref('list/' + email)
                .set({
                    Email: email,
                    ps: password,
                });

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
                firebase.database().ref('users/' + providerData.uid)
                    .set({
                        Email: providerData.email,
                        PhotoURL: providerData.photoURL,
                        Name: providerData.displayName
                    });
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
                firebase.database().ref('users/' + providerData.uid)
                    .set({
                        Email: providerData.email,
                        PhotoURL: providerData.photoURL,
                        Name: providerData.displayName
                    });
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
                firebase.database().ref('users/' + providerData.uid)
                    .set({
                        Email: providerData.email,
                        PhotoURL: providerData.photoURL,
                        Name: $scope.user.name
                    });
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



.controller('profileCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$firebaseObject', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $ionicHistory, $firebaseObject) {

        var ref = firebase.database().ref("users/" + firebase.auth().currentUser.uid);
        var user = $firebaseObject(ref);
        user.$loaded().then(function() {
            console.log(user);
            angular.forEach(user, function(value, key) {
                console.log(key, value);
            });
        });


        //$('#profile_image').empty();
        //$('#profile_image').append('<img id="theImg" src="theImg.png" />')
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
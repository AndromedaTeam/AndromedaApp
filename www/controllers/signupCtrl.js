digitalVotingApp.controller('signupCtrl', ['$scope', '$stateParams', '$ionicPopup', '$ionicLoading', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, $ionicPopup, $ionicLoading, $state) {
        $scope.user = {
            name: this.name,
            email: this.email,
            password: this.password,
            mobile: this.mobile
        }
        $scope.signupWithEmail = function() {
            // $ionicLoading.show({
            //     template: '<ion-spinner icon="bubbles"></ion-spinner><p>LOADING...</p>'
            // });
            firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(result) {
                var providerData = result.providerData[0];
                firebase.database().ref('users/' + result.uid)
                    .set({
                        Email: providerData.email,
                        PhotoURL: providerData.photoURL,
                        Name: $scope.user.name,
                        Mobile: $scope.user.mobile
                    }).then(function() {
                        //$ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success!',
                            template: "Registration successfull"
                        });
                        alertPopup.then(function(res) {
                            $state.transitionTo("tabsController.polling");
                        });
                    });
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                //$ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops!',
                    template: errorMessage
                });
            });
        }
    }
]);
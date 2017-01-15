digitalVotingApp.controller('profileCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$firebaseObject', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
]);
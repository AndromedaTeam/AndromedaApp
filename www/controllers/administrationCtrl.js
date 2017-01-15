digitalVotingApp.controller('administrationCtrl', ['$scope', '$stateParams', '$firebase', '$firebaseArray',
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
]);
digitalVotingApp.controller('administrationCtrl', ['$scope', '$stateParams', '$firebaseArray', '$state', '$rootScope',
    function($scope, $stateParams, $firebaseArray, $state, $rootScope) {
        var ref = firebase.database().ref('users/');
        var list = $firebaseArray(ref);
        $scope.users = list;

        $scope.event = {
            name: this.name,
            desc: this.desc
        };

        // $scope.user = firebase.auth().currentUser;
        // $scope.users = UserService.getAllUsers();

        $scope.listUsers = function() {
            console.log($scope.users);
            $state.transitionTo("manageUsers");
        }

        // $scope.getUserById = function() {
        //     $scope.user = UserService.getUserById("106080231831178666577");
        //     console.log($scope.user);
        // }
        $scope.createNewEvent = function() {
            $state.transitionTo("createEvent");
        };
        $scope.manageEvents = function() {
            $state.transitionTo("manageEvents");
        };
        $scope.submitEvent = function() {
            firebase.database().ref('events/' + firebase.auth().currentUser.uid)
                .set({
                    Name: $scope.event.name,
                    Description: $scope.event.desc,
                }).then(function() {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Success!',
                        template: "Event created successfully"
                    });
                });


            alertPopup.then(function(res) {
                $state.transitionTo("tabsController.administration");
            });
        }
    }
]);
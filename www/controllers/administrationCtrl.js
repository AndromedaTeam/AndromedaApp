digitalVotingApp.controller('administrationCtrl', ['$scope', '$stateParams', '$firebaseArray', '$state', '$rootScope', '$ionicPopup', '$firebaseObject',
    function($scope, $stateParams, $firebaseArray, $state, $rootScope, $ionicPopup, $firebaseObject) {
        var ref = firebase.database().ref('users/');
        var list = $firebaseArray(ref);
        $scope.users = list;

        $scope.event = {
            name: this.name,
            desc: this.desc,
            id: null
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
        $scope.editEvent = function(name, desc) {
            $scope.event1 = {
                name: name,
                desc: desc
            };
            $state.transitionTo("editEvent");
        };
        $scope.submitEvent = function() {
            var ref = firebase.database().ref('events/' + firebase.auth().currentUser.uid);
            var list = $firebaseArray(ref);
            list.$add({
                Name: $scope.event.name,
                Description: $scope.event.desc,
            }).then(function() {
                var alertPopup = $ionicPopup.alert({
                    title: 'Success!',
                    template: "Event created successfully"
                });
                alertPopup.then(function(res) {
                    $state.transitionTo("manageEvents");
                });
            });
        }
        $scope.events = [];
        $scope.poll = {};
        $scope.loadEvents = function() {
            setTimeout(function() {
                $scope.events = [];
                var ref = firebase.database().ref('events/' + firebase.auth().currentUser.uid);
                var obj = $firebaseArray(ref);
                obj.$loaded().then(function() {
                    angular.forEach(obj, function(value, key) {
                        // $scope.poll.key=value;
                        $scope.events.push(value);
                    });
                    console.log($scope.events);
                });
            }, 500);


        };
        $scope.selectedAll = false;
        $scope.selected = {};
        $scope.selectAll = function() {
            $scope.selectedAll = !$scope.selectedAll;
            for (var i = 0; i < $scope.events.length; i++) {
                var item = $scope.events[i];

                $scope.selected[item.Name] = $scope.selectedAll;
            }
        };
        $scope.deleteEvent = function() {
            var ref = firebase.database().ref('events/' + 'R71XUPUN8JYu7yOKAdIIADBgmEh2');
            var list = $firebaseArray(ref);
            list.$loaded().then(function() {
                angular.forEach(list, function(item) {
                    if ($scope.selected[item.Name] == true) {
                        list.$remove(item).then(function(ref) {
                            console.log(deleted); // true

                        });
                    }
                });
                $scope.loadEvents();
            });
        };

        $scope.openEvent = function() {
            alert($scope.event.id)
        }
    }
]);
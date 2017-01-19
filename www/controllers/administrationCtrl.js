digitalVotingApp.controller('administrationCtrl', ['$scope', '$stateParams', '$firebaseArray', '$state', '$rootScope', '$ionicPopup', '$ionicLoading', '$firebaseObject',
    function($scope, $stateParams, $firebaseArray, $state, $rootScope, $ionicPopup, $ionicLoading, $firebaseObject) {
        var ref = firebase.database().ref('users/');
        var list = $firebaseArray(ref);
        $scope.users = list;


        var ref = firebase.database().ref('events/' + firebase.auth().currentUser.uid);
        $scope.eventList = $firebaseArray(ref);



        $scope.event = {
            selectedEvent: null
        };


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
            $ionicLoading.show();
            $scope.eventList.$add({
                Name: $scope.event.name,
                Description: $scope.event.desc,
            }).then(function() {
                $scope.event.name = "";
                $scope.event.desc = "";
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Success!',
                    template: "Event created successfully"
                });
                alertPopup.then(function(res) {
                    //$state.transitionTo("manageEvents");
                });
            });
        }



        $scope.deleteEvent = function() {

            $scope.eventList.$remove($scope.event.selectedEvent).then(function() {
                var alertPopup = $ionicPopup.alert({
                    title: 'Success!',
                    template: "Deleted successfully"
                });
            });
            // angular.forEach($scope.eventList, function(item) {
            //     if (item.$id === $scope.event.selectedEvent.$id) {
            //         console.log(item);
            //     }
            // });
        };



        //After selecting event
        $scope.selectedEvent = null;

        $scope.openEvent = function() {
            var eventPath = 'events/' + firebase.auth().currentUser.uid + '/' + $scope.event.selectedEvent.$id;
            var selectedEventRef = firebase.database().ref(eventPath);
            $scope.selectedEvent = $firebaseObject(selectedEventRef);
            $scope.selectedEvent.$loaded(function(data) {
                console.log(data);
            });
        }
    }
]);
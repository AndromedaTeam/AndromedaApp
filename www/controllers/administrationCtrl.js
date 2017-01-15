digitalVotingApp.controller('administrationCtrl', ['$scope', '$stateParams', '$firebase', '$firebaseArray','$state','$rootScope',
    function($scope, $stateParams, $firebase, $firebaseArray,$state,$rootScope) {
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
        $scope.createNewEvent=function(){
            $state.transitionTo("createEvent");
        };
        $scope.manageEvents=function(){
            $state.transitionTo("manageEvents");
        };
        $scope.submitEvent=function(){
            $scope.event={
                name:this.name,
                desc:this.desc
            };
             firebase.database().ref('events/' + $rootScope.userId)
                    .set({
                        Name: $scope.event.name,
                        Description: $scope.event.desc,
                    }).then(function(){
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
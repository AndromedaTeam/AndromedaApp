angular.module('app.services', [])

.factory('BlankFactory', [function() {

}])

.service('BlankService', [function() {

}])

.factory("UserService", [

    function($firebaseObject) {

        this.getUserById = function(uid) {
            var ref = firebase.database().ref('users/' + uid);
            var user = null;
            ref.once('value', function(snapshot) {
                var user = snapshot;
            }).then(function() {
                return user;
            });
        }

        this.getAllUsers = function() {
            var ref = firebase.database().ref('users/');
            var users = [];
            ref.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    users.push(childSnapshot.val());
                });
            }).then(function() {
                return users;
            });
        }

        return this;
    }
]);


// ref.once('value', function(snapshot) {
//     snapshot.forEach(function(child){
//         console.log(child);
//     })
// })
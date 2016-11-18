(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$location', '$rootScope', '$window'];
    function userFactory($location, $rootScope, $window) {
        var _user = null;
        var _error = null;

        var service = {
            //functions
            authenticate: authenticate,
            getErrorMessage: getErrorMessage,
            isAuthenticated: isAuthenticated,
        };
        
        return service;

        ////////////////
        function authenticate(user) {
            $window.firebase.auth().signInWithEmailAndPassword(user.username, user.password)
                .then(function(user) {
                    _user = user;
                    $location.path('/movies');
                    $rootScope.$apply();
                }, function(error) {
                    _error = error;
                })
                .catch(function(error) {
                    _error = error;
                });
        }
        
        function getErrorMessage() {
            return _error ? _error.message : '';
        }

        function isAuthenticated() {
            //return true; 
            return _user && _user.uid;
        }
    }
})();
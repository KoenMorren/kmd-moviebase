(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .controller('loginController', loginController);

    loginController.$inject = ['userFactory'];
    function loginController(userFactory) {
        var vm = this;
        
        angular.extend(vm, {
            //variables
            user: {
                username: null,
                password: null
            },

            //functions
            authenticate: authenticate,
            getErrorMessage: getErrorMessage
        });

        activate();

        ////////////////

        function activate() { }

        function getErrorMessage() {
            return userFactory.getErrorMessage();
        }

        function authenticate() {
            userFactory.authenticate(vm.user);
        }
    }
})();
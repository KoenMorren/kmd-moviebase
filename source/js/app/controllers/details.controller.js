(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .controller('detailsController', detailsController);

    detailsController.$inject = ['movieInfo'];
    function detailsController(movieInfo) {
        var vm = this;
        
        angular.extend(vm, {
            //variables
            movie: movieInfo,

            //functions
        });

        activate();

        ////////////////

        function activate() { }
    }
})();
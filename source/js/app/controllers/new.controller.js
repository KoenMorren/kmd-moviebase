(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .controller('newController', newController);

    newController.$inject = ['dbFactory', 'omdbFactory'];
    function newController(dbFactory, omdbFactory) {
        var vm = this;
        
        angular.extend(vm, {
            //variables
            imdbID: null,
            movieObj: null,

            //functions
            clearData: clearData,
            getDataForId: getDataForId,
            persistMovie: persistMovie,
        });

        /////////////////

        function clearData() {
            vm.movieObj = null;
        }

        function getDataForId() {
            omdbFactory.getDataByID(vm.imdbID).then(
                function(movie) {
                    vm.movieObj = movie;
                    console.log(movie);
                }
            );
        }

        function persistMovie() {
            dbFactory.addMovie(vm.movieObj);
        }
    }
})();
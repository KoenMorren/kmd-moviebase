(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .controller('listController', listController);

    listController.$inject = ['$location' ,'dbFactory', 'movies'];
    function listController($location, dbFactory, movies) {
        var vm = this;
        
        angular.extend(vm, {
            //variables
            movies: dbFactory.movies,

            //function
            generateImageStyle: generateImageStyle,
            goToDetails: goToDetails
        });

        activate();

        ////////////////

        function activate() { 
            
        }

        function generateImageStyle(movie) {
            return {
                'background-image': 'url(' + movie.image + ')'
            };
        }

        function goToDetails(movie) {
            $location.path('/movie/' + movie.id);
        }

        //Infinite scrolling   
    }
})();
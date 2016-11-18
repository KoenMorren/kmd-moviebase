(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .factory('dbFactory', dbFactory);

    dbFactory.$inject = ['$http', '$q', '$window', 'MODELS'];
    function dbFactory($http, $q, $window, MODELS) {
        var _movies = $window.firebase.database().ref('/movies');
        var _fetchLimit = 20;

        var service = {
            //variables
            movies: null,

            //functions
            addMovie: addMovie,
            deleteMovie: deleteMovie,
            getListOfMovies:getListOfMovies,
            getMovieDetails: getMovieDetails,
            updateMovieDetails: updateMovieDetails,
        };

        return service;

        ////////////////

        function addMovie(movie) {
            var updates = {};
            updates[movie.id] = movie;
            _movies.update(updates);
        }
        function deleteMovie() {}
        function getListOfMovies() {
            // var mov = {
            //     id: 'tt987654321',
            //     title: 'base title for movie',
            //     year: 2016
            // } ;
            // _movies.update({
            //     '/tt9876543221': mov 
            // });

            // _movies.once('value').then(function(data) {
            //     console.log(data.val());
            // });

            var deferred = $q.defer();

            _movies.orderByChild('title').limitToFirst(_fetchLimit).once('value').then(function(data) {
                service.movies = data.val();
                deferred.resolve(service.movies);
            });

            return deferred.promise;
        }
        function getMovieDetails() {}
        function updateMovieDetails() {}
    }
})();
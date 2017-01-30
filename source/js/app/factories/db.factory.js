(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .factory('dbFactory', dbFactory);

    dbFactory.$inject = ['$http', '$rootScope', '$q', '$window', 'MODELS'];
    function dbFactory($http, $rootScope, $q, $window, MODELS) {
        var _movies = $window.firebase.database().ref('/movies');
        var _fetchLimit = 20;

        var service = {
            //variables
            movies: {},

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
        function getListOfMovies(searchTerm) {
            var deferred = $q.defer();

            var searchStart = (searchTerm || '').trim();
            
            if (searchStart) {
                var searchEnd = searchStart ? calculateEndTerm(searchStart) : '';
                _movies.orderByChild('searchterm').startAt(searchStart).endAt(searchEnd).once('value').then(handleCallback);
                //todo - implement pagination
                //_movies.orderByChild('searchterm').startAt(searchStart).endAt(searchEnd).limitToFirst(_fetchLimit).once('value').then(handleCallback);
            } else {
                _movies.orderByChild('searchterm').once('value').then(handleCallback);
                //todo - implement pagination
                //_movies.orderByChild('searchterm').limitToFirst(_fetchLimit).once('value').then(handleCallback);
            }

            return deferred.promise;

            function handleCallback(data) {
                //append to movies if searchterm is unchanged (infinite scrolling)
                clearMovies();
                appendToMovies(data.val());
                deferred.resolve(service.movies);
            }
        }
        function getMovieDetails(id) {
            var deferred = $q.defer();

            _movies.child(id).once('value').then(function(data) {
                deferred.resolve(data.val());
            });

            return deferred.promise;
        }
        function updateMovieDetails() {}

        /////////////
        // Helpers //
        /////////////
        function calculateEndTerm(startTerm) {
            var arr = startTerm.split('');

            for(var i = arr.length - 1; i >= 0; i--) {
                var code = arr[i].charCodeAt(0);

                if (code !== 122) {
                    code += 1;
                    arr[i] = String.fromCharCode(code);
                    break;
                }
            }

            return arr.join('');
        }
        function clearMovies() {
            for (var prop in service.movies) { 
                if (service.movies.hasOwnProperty(prop)) { 
                    delete service.movies[prop]; 
                } 
            }
        }
        function appendToMovies(data) {
            for (var key in data) {
                service.movies[key] = data[key];
            }
            $rootScope.$apply();
        }
        function getMovies() { 
            return service.movies; 
        }
    }
})();
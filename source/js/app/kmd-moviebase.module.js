(function() {
    'use strict';

    angular
        .module('kmd-moviebase', ['ngRoute', 'firebase'])
        .config(configuration)
        .constant('MODELS', getModels());
    
    configuration.$inject = ['$routeProvider', '$locationProvider'];
    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            // .when('/', {
            //     templateUrl: '../../partials/home.html'
            // })
            .when('/movies', {
                templateUrl: '../../partials/list.html',
                controller: 'listController',
                controllerAs: 'vm',
                resolve: {
                    authenticate: checkAuthentication
                }
            })
            .when('/movie/:id', {
                templateUrl: '../../partials/details.html',
                resolve: {
                    authenticate: checkAuthentication
                }
            })
            .when('/login', {
                templateUrl: '../../partials/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/new', {
                templateUrl: '../../partials/new.html',
                controller: 'newController',
                controllerAs: 'vm'
            })
            .otherwise('/movies');
        
        //$locationProvider.html5Mode(true);
    }

    checkAuthentication.$inject = ['$location', '$q', 'userFactory'];
    function checkAuthentication($location, $q, userFactory) {
        var deferred = $q.defer();

        if (userFactory.isAuthenticated()) {
            deferred.resolve();
        } else {
            deferred.reject();
            $location.path('/login');
        }

        return deferred.promise;
    }

    function getModels() {
        function MovieModel() {
            this.id = null;
            this.title = null;
            this.image = null;
            this.synopsis = null;
            this.release_date = null;
            this.runtime = null;
            this.genre = null;
            this.language = null;
            this.rating = null;
        }
        MovieModel.prototype.fill = function (data) {
            this.id = data.imdbID;
            this.title = data.Title;
            this.image = data.Poster;
            this.synopsis = data.Plot;
            this.release_date = data.Released;
            this.runtime = data.Runtime;
            this.genre = data.Genre.split(', ');
            this.language = data.Language;
            this.rating = data.imdbRating;
        };

        return {
            Movie: MovieModel
        };
    }
})();
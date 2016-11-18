(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .factory('omdbFactory', omdbFactory);

    omdbFactory.$inject = ['$http', '$q', 'MODELS'];
    function omdbFactory($http, $q, MODELS) {
        var _url = 'http://www.omdbapi.com';
        var service = {
            getDataByID: getDataByID
        };
        
        return service;

        ////////////////
        function getDataByID(id) {
            var deferred = $q.defer();

            $http.get(_url + '/?i=' + id).then(
                function(payload) {
                    var mov = new MODELS.Movie();
                    mov.fill(payload.data);
                    deferred.resolve(mov);
                },
                function(error) {
                    console.log(error);
                    deferred.reject();
                }
            );

            return deferred.promise;
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('kmd-moviebase')
        .directive('kmdHeader', header);

    header.$inject = [];
    function header() {
        return {
            bindToController: {},
            controller: 'headerController',
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: './js/app/directives/header/header.html'
        };
    }
})();
(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .controller('headerController', headerController);

    headerController.$inject = ['$element', '$location', '$window', 'userFactory'];
    function headerController($element, $location, $window, userFactory) {
        var vm = this;
        
        angular.extend(vm, {
            //variables
            searchIsOpen: false,
            searchIsVisible: userFactory.isAuthenticated,
            searchTerm: '',

            //functions
            search: search,
            toggleSearch: toggleSearch,
        });

        ///////////

        function search() {
            vm.searchIsOpen = false;
            $element.children()[0].children[0].children[0].children[1].children[1].children[0].blur();

            $location.path('/movies/' + $window.encodeURIComponent(vm.searchTerm));
        }

        function toggleSearch() {
            vm.searchIsOpen = !vm.searchIsOpen;

            if (vm.searchIsOpen) {
                vm.searchTerm = '';
                $element.children()[0].children[0].children[0].children[1].children[1].children[0].focus();
            } else {
                $element.children()[0].children[0].children[0].children[1].children[1].children[0].blur();
            }
        }
    }
})();
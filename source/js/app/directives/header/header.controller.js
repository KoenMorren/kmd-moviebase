(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .controller('headerController', headerController);

    headerController.$inject = ['$element', 'userFactory'];
    function headerController($element, userFactory) {
        var vm = this;
        
        angular.extend(vm, {
            //variables
            searchIsOpen: false,
            searchIsVisible: userFactory.isAuthenticated,
            searchTerm: '',

            //functions
            toggleSearch: toggleSearch
        });

        activate();

        ///////////

        function activate() {

        }

        function toggleSearch() {
            vm.searchIsOpen = !vm.searchIsOpen;

            if (vm.searchIsOpen) {
                vm.searchTerm = '';
                $element.children()[0].children[0].children[0].children[1].children[1].focus();
            } else {
                $element.children()[0].children[0].children[0].children[1].children[1].blur();
            }
        }
    }
})();
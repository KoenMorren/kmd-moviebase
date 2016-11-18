(function() {
'use strict';

    angular
        .module('kmd-moviebase')
        .controller('listController', listController);

    listController.$inject = ['$location' ,'dbFactory'];
    function listController($location, dbFactory) {
        var vm = this;
        
        angular.extend(vm, {
            //variables
            movies: null,

            //function
            generateImageStyle: generateImageStyle,
            goToDetails: goToDetails
        });

        activate();

        ////////////////

        function activate() { 
            vm.movies2 = [
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                },
                {
                    title: 'Harry Potter and the bla bla',
                    image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
                }
            ];

            dbFactory.getListOfMovies().then(function(movies) {
                vm.movies = movies;
            });;
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
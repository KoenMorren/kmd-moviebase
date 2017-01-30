(function () {
    'use strict';

    angular.module('kmd-moviebase')
           .run(['$templateCache', function($templateCache) {
        $templateCache.put('./js/app/directives/header/header.html','<div class="header-container"><div class="header"><div class="container"><a href="#/">MovieBase</a><div class="search" data-ng-class="{\'active\': vm.searchIsOpen}" data-ng-show="vm.searchIsVisible()"><i class="material-icons" data-ng-click="vm.toggleSearch();">search</i><form><input type="text" data-ng-model="vm.searchTerm" data-ng-blur="vm.toggleSearch()"> <input type="submit" data-ng-click="vm.search()"></form></div></div></div><div class="mobile-search" data-ng-show="vm.searchIsVisible()"><i class="material-icons">search</i><form><input type="text" placeholder="Search" data-ng-model="vm.searchTerm"> <input type="submit" data-ng-click="vm.search()"></form></div></div>');
    }]);
})();
(function () {
    'use strict';

    angular.module('kmd-moviebase')
           .run(['$templateCache', function($templateCache) {
        $templateCache.put('../../partials/details.html','<div class="details-container"><span class="image-container"><img alt="{{vm.movie.title}}" data-ng-src="{{vm.movie.image}}"> </span><span class="details"><p class="title">{{vm.movie.title}}</p><p class="releasedate">{{vm.movie.release_date}}</p><p class="synopsis">{{vm.movie.synopsis}}</p></span></div>');
        $templateCache.put('../../partials/home.html','home');
        $templateCache.put('../../partials/list.html','<div class="list-container"><div class="list-item" data-ng-click="vm.goToDetails(movie)" data-ng-repeat="(id, movie) in vm.movies"><div class="image-container" data-ng-style="vm.generateImageStyle(movie)"></div><div class="title-container">{{movie.title}}</div></div></div>');
        $templateCache.put('../../partials/login.html','<div class="login-container"><form><div><input type="text" data-ng-model="vm.user.username" placeholder="Username"></div><div><input type="password" data-ng-model="vm.user.password" placeholder="Password"></div><div class="error">{{vm.getErrorMessage()}}</div><div><input type="submit" data-ng-click="vm.authenticate()" value="Login"></div></form></div>');
        $templateCache.put('../../partials/new.html','<label for="id">IMDB Id</label><input type="text" id="id" data-ng-model="vm.imdbID"> <button data-ng-click="vm.getDataForId()">Get data</button><br><br><div class="movie_details" data-ng-show="vm.movieObj"><p><label for="title">Title</label><input type="text" id="title" data-ng-model="vm.movieObj.title"></p><p><label for="language">Language</label><input type="text" id="language" data-ng-model="vm.movieObj.language"></p><p><label for="runtime">Runtime</label><input type="text" id="runtime" data-ng-model="vm.movieObj.runtime"></p><p><label for="rating">Rating</label><input type="text" id="rating" data-ng-model="vm.movieObj.rating"></p><p><label for="release_date">Release date</label><input type="text" id="release_date" data-ng-model="vm.movieObj.release_date"></p><p><label for="synopsis">Synopsis</label><textarea id="synopsis" data-ng-model="vm.movieObj.synopsis">\r\n        </textarea></p><p><label for="image">Image</label><input type="text" id="image" data-ng-model="vm.movieObj.image"></p><p><label for="genre">Genre</label><input type="text" id="genre" data-ng-model="vm.movieObj.genre"></p><p><button data-ng-click="vm.persistMovie()">Add</button> <button data-ng-click="vm.clearData()">Clear</button></p></div>');
    }]);
})();
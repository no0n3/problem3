'use strict';

(function() {
    angular
        .module('problem_3', ['ngRoute'])
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config ($routeProvider, $locationProvider) {
        $locationProvider
            .hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl: 'game/views/index.html',
                controller: 'GameController'
            });
    }
})();

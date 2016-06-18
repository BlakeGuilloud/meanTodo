(function() {
    'use strict';

    angular
        .module('todoList', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'src/js/todoList.html',
                    controller: 'todoController'
                });
        });
}());

(function() {
    'use strict';

    angular
        .module('todoList', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'client/js/todoList.html',
                    controller: 'todoController'
                });
        });
}());

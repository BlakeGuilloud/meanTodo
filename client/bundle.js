(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
(function() {
    'use strict';

    angular
        .module('todoList')
        .controller('todoController', function(todoService, $scope) {

            $scope.postTodo       =   postTodo;
            $scope.deleteTodo     =   deleteTodo;
            $scope.editTodo       =   editTodo;
            $scope.completeTodo   =   completeTodo;
            $scope.clearCompleted =   clearCompleted;

            activate();

            function activate() {
                getTodos();
            }

            function getTodos() {
                return todoService.getTodos()
                    .then((todos) => {
                        $scope.todos = todos.data;
                    });
            }

            function postTodo(todo) {
                if (!todo) return;
                return todoService.postTodo(todo)
                    .then((todos) => {
                        getTodos();
                        clearForm();
                    });
            }

            function deleteTodo(todo) {
                return todoService.deleteTodo(todo)
                    .then((todo) => {
                        getTodos();
                    });
            }

            function editTodo(todo) {
                return todoService.editTodo(todo)
                    .then((todo) => {
                        getTodos();
                    });
            }

            function completeTodo(todo) {
                todo.complete = !todo.complete;
                return todoService.editTodo(todo)
                    .then((todo) => {
                        getTodos();
                    });
            }

            function clearCompleted(todos) {
                let completed = todos.filter((todo) => {
                    return todo.complete === true;
                });
                completed.forEach((todo) => {
                    return deleteTodo(todo);
                });
            }

            function clearForm() {
                $scope.todo = undefined;
            }
        });
}());

},{}],3:[function(require,module,exports){
(function() {
    'use strict';

    angular
        .module('todoList')
        .factory('todoService', function($http) {

            function getTodos() {
                return $http.get('/todos');
            }

            function postTodo(todo) {
                return $http.post('/todos', todo);
            }

            function deleteTodo(todo) {
                let todoId = todo._id;
                return $http.delete('/todos/' + todoId);
            }

            function editTodo(todo) {
                let todoId = todo._id;
                return $http.put('/todos/' + todoId, todo);
            }

            return {
                getTodos,
                postTodo,
                deleteTodo,
                editTodo,
            }
        });
}());

},{}]},{},[1,2,3]);

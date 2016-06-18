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

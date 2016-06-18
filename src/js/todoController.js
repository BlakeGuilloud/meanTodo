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
                $scope.todo = {}
            }
        });
}());

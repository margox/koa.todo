'use strict';

var todos = [];

function getTodoIndexById(id) {
    return todos.findIndex(function (item) {
        return item.id === id;
    });
}

module.exports = {

    add: function (todo) {
        todos.push(todo);
        return todo;
    },

    remove: function (id) {
        var index = getTodoIndexById(id);
        index >= 0 && todos.splice(index, 1);
        return id;
    },

    check: function (id) {
        var index = getTodoIndexById(id);
        if (todos[index]) {
            todos[index].checked = !todos[index].checked;
            return todos[index].checked;
        }
        return false;
    },

    list: function () {
        return todos;
    }

};

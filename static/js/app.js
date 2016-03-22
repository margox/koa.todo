/**
 * Todo List App Scripts
 */

var todoListEle = $('#todo-list');
var newTodoEle = $('#new-todo');
var todoForm = $('#todo-form');

var isSending = false;

todoListEle.addEventListener('click', function (e) {

    if (e.target.className === 'remove-todo') {
        removeItem(e.target);
    } else if (e.target.className === 'todo-check-label') {
        checkItem(e.target);
    }

}, false);

newTodoEle.addEventListener('keydown', function (e) {

    var value = trim(this.value);
    var that = this;

    if (e.keyCode === 13) {

        if (isSending) {
            return;
        }

        if (!value) {
            this.classList.add('error');
        } else {
            isSending = true;
            todoForm.classList.add('sending');
            fetch('./add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "content=" + value
            }).then(function (res) {
                if (res.ok) {
                    that.value = '';
                    res.json().then(function (data) {
                        renderNewItem(data);
                    });
                } else {
                    console.error('somthing wrong');
                }
                isSending = false;
                todoForm.classList.remove('sending');
            }, function () {
                isSending = false;
                todoForm.classList.remove('sending');
                console.error('unable to send a new todo, please try again');
            });
        }
    }

});

newTodoEle.addEventListener('input', function () {
    this.classList.remove('error');
}, false);

function renderNewItem(data) {
    var html = [
        '<li class="todo-item" id="todo-item-' + data.id + '">',
        '<div class="opts">',
        '<input type="checkbox" class="todo-check" id="todo-check-' + data.id + '" data-id="' + data.id + '">',
        '<label class="todo-check-label" data-id="' + data.id + '"></label>',
        '</div>',
        '<button class="remove-todo" data-id="' + data.id + '"></button>',
        '<span>' + data.content + '</span>',
        '</li>'
    ].join('');
    todoListEle.innerHTML += html;
}

function removeItem(obj) {

    var id = obj.dataset.id;
    obj.classList.add('removing');
    fetch('./remove/' + id).then(function (res) {
        if (res.ok) {
            res.json().then(function (data) {
                todoListEle.removeChild($('#todo-item-' + data.todoid));
            });
        } else {
            console.error('something wrong!');
        }
        obj.classList.remove('removing');
    }, function () {
        obj.classList.remove('removing');
        console.error('unable to remove a todo item');
    });

}

function checkItem(obj) {

    var id = obj.dataset.id;
    obj.classList.add('loading');
    fetch('./check/' + id).then(function (res) {
        if (res.ok) {
            res.json().then(function (data) {
                $('#todo-check-' + id) && ($('#todo-check-' + id).checked = data.checked);
            });
        } else {
            console.error('something wrong!');
        }
        obj.classList.remove('loading');
    }, function () {
        obj.classList.remove('loading');
        console.error('unable to change the status of a todo');
    });

}

function trim(string) {
    return string.replace(/(^\s*)|(\s*$)/g, "");
}

function $(string) {
    return /^#/.test(string) ? document.querySelector(string) : document.querySelectorAll(string);
}

window.onload = function () {
    document.body.classList.remove('before-loaded');
}

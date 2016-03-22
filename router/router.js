'use strict';

const router = require('koa-router')();
const utils = require('../utils/utils');
const todos = require('../model/todos');

router.get('/', function* () {
    yield this.render('index', {
        todos: todos.list()
    });
});

router.param('todoid', function* (todoid, next) {
    this.todoid = todoid;
    if (!this.todoid) return this.status = 404;
    yield next;
});

router.get('/remove/:todoid', function* (todoid) {
    this.body = JSON.stringify({
        todoid: todos.remove(this.todoid)
    });
});

router.get('/check/:todoid', function* () {
    this.body = JSON.stringify({
        checked: todos.check(this.todoid)
    });
});

router.post('/add', function* () {
    var content = this.request.body.content;
    var newtodo = todos.add({
        'id': utils.guid(),
        'checked': false,
        'content': content
    });
    this.body = newtodo;
});

module.exports = router;

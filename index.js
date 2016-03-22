/**
 * Just a todo demo
 */

'use strict';

const koa = require('koa');
const staticserver = require('koa-static');
const bodyparser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');

const router = require('./router/router');

const app = koa();

app.use(bodyparser());
app.use(staticserver(path.join(__dirname, 'static')));
app.use(views(__dirname + '/views', {
    map: {
        html: 'handlebars'
    }
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('server is running');

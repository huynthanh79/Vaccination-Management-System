//const newRouter = require('./news');
//const meRouter = require('./me');
const siteRouter = require('./site-router');
//const coursesRouter = require('./courses');

function route(app) {
    // app.use('/me', meRouter);

    // app.use('/news', newRouter);

    // app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
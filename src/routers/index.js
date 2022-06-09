//const newRouter = require('./news');
const injectionPointRouter = require('./injection-point-router');
const siteRouter = require('./site-router');
const employeeRouter = require('./employee-router');
const injectionInforRouter = require('./injection-information-router');

function route(app) {

    app.use('/injection-point', injectionPointRouter);

    app.use('/view-employee', employeeRouter);

    app.use('/injection-information', injectionInforRouter)

    app.use('/', siteRouter);
}

module.exports = route;
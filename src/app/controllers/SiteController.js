const res = require('express/lib/response');
const { conn, sql } = require('../../config/db/index');

class SiteController {
    //[Get] /home
    home(req, res, next) {
        res.render('home');
    }

    //[Get] /injection-point
    showInjectionPoint(req, res, next) {
        res.render('injection-point');
    };
}

module.exports = new SiteController();
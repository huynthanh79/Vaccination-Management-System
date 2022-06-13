const res = require('express/lib/response');
const { conn, sql } = require('../../config/db/index');

class SiteController {
    //[Get] /home
    home(req, res, next) {
        res.render('home');
    }
}

module.exports = new SiteController();
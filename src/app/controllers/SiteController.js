const res = require('express/lib/response');
const { conn, sql } = require('../../config/db/index');

class SiteController {
    //[Get] /home
    home(req, res, next) {
        res.render('home');
    }

    //[Get] /injection-information
    showInjectionInformation(req, res, next) {
        res.render('injection-information');
    };

    //[Get] /injection-point
    showInjectionPoint(req, res, next) {
        res.render('injection-point');
    };


    //[Get] /view-employee
    async showViewEmployee(req, res, next) {
        const pool = await conn;
        const query = 'select MAPDKT, HOTENKH, CMND, DIACHI, HINHTHUCTIEM, NGAYLAP from PHIEUDANGKYTIEM pdkt, KHACHHANG kh where kh.MAKH = pdkt.MAKH';
        await pool.request()
        .query(query)
        .then(result => {
            res.render('employee_view', {
                InjectionInformation: result.recordset,
            });
        });
        
    };
}

module.exports = new SiteController();
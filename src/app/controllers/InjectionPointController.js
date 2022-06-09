const res = require('express/lib/response');
const { conn, sql } = require('../../config/db/index');

class InjectionInformationController {
    //[GET] /injection-point
    async showInjectionPointFrom(req, res, next) {
        const pool = await conn;
        const query1 = 'select MAKH, HOTENKH, CMND, DIACHI from KHACHHANG';
        const query2 = 'select MAVC, TENVC, MOTA from VACXIN';
        Promise.all([pool.request().query(query1), pool.request().query(query2)])
        .then(([result1, result2]) => {
            res.render('injection-point/injection-point', {
                Customers: result1.recordset,
                Vaccines: result2.recordset,
            });
        });
    };

    //[POST] /injection-point/store
    async storeInjectionPoint(req, res, next) {
        const pool = await conn;
        const query = 'insert into GIAYCHIDINHTIEMCHUNG values (@mavc, @manv, @makh, @stt, @ngaytiem, @chidinh, @mota)';
        await pool.request()
        .input('makh', sql.Int, req.body.customerID)
        .input('mavc', sql.Int, req.body.vacxinID)
        .input('manv', sql.Int, 5)
        .input('ngaytiem', sql.Date, req.body.injection_date)
        .input('stt', sql.Int, req.body.serial)
        .input('chidinh', sql.NVarChar, req.body.conclusion)
        .input('mota', sql.NVarChar, req.body.descripttion)
        .query(query)
        .then((result)=> {
            res.redirect('back');
        });
    }

}

module.exports = new InjectionInformationController();

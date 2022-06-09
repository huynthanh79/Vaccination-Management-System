const res = require('express/lib/response');
const { conn, sql } = require('../../config/db/index');

class InjectionInformationController {
    //[GET] /injection-information
    async showInjectionInformationFrom(req, res, next) {
        const pool = await conn;
        const query1 = 'select MAKH, HOTENKH, CMND, DIACHI from KHACHHANG';
        const query2 = 'select MAVC, TENVC from VACXIN';
        Promise.all([pool.request().query(query1), pool.request().query(query2)])
        .then(([result1, result2]) => {
            res.render('injection-information/injection-information', {
                Customers: result1.recordset,
                Vaccines: result2.recordset,
            });
        });
    };

    //[POST] /injection-information/store
    async storeInjectionInformation(req, res, next) {
        const pool = await conn;
        const query = 'insert into THONGTINTIEMCHUNG values (@makh, @mavc, @manv, @ngaytiem, @ngaytiemtiep, @tinhtrang, @ghichu)';
        let nextDay;
        if(req.body.injection_next_date === '') {
            nextDay = null;
        }
        else {
            nextDay = req.body.injection_next_date;
        }
        await pool.request()
        .input('makh', sql.Int, req.body.customerID)
        .input('mavc', sql.Int, req.body.vacxinID)
        .input('manv', sql.Int, 5)
        .input('ngaytiem', sql.Date, req.body.injection_date)
        .input('ngaytiemtiep', sql.Date, nextDay)
        .input('tinhtrang', sql.NVarChar, req.body.patient_condition)
        .input('ghichu', sql.NVarChar, req.body.patient_note)
        .query(query)
        .then(()=> {
            res.redirect('back');
        });
    }

}

module.exports = new InjectionInformationController();
const res = require('express/lib/response');
const { conn, sql } = require('../../config/db/index');

class EmployeeController {
    //[GET] /view-employee/view-registration-list
    async showRegistrationList(req, res, next) {
        const pool = await conn;
        const query1 = 'select MAPDKT, HOTENKH, CMND, DIACHI, HINHTHUCTIEM, NGAYLAP from PHIEUDANGKYTIEM pdkt, KHACHHANG kh where kh.MAKH = pdkt.MAKH';
        const query2 = 'select MAKH, HOTENKH, CMND, DIACHI from KHACHHANG';
        // await pool.request()
        // .query(query)
        // .then(result => {
        //     res.render('employee_view', {
        //         InjectionInformation: result.recordset,
        //     });
        // });

        Promise.all([pool.request().query(query1), pool.request().query(query2)])
        .then(([result1, result2]) => {
            res.render('employee-view/employee_view_registration_list', {
                InjectionInformation: result1.recordset.sort((a, b) => {
                    if ( a.MAPDKT < b.MAPDKT ){
                        return -1;
                    }
                    if ( a.MAPDKT > b.MAPDKT ){
                        return 1;
                    }
                    return 0;
                }),
                Customers: result2.recordset,
            });
        });
    };

    //[GET] /view-employee/create-order-form
    async showOrderForm(req, res, next) {
        const pool = await conn;
        const query2 = 'select MAKH, HOTENKH, CMND, DIACHI from KHACHHANG';
        await pool.request()
        .query(query2)
        .then(result => {
            res.render('employee-view/employee_view_create_order', {
                Customers: result.recordset,
            });
        });
    }


    //[GET] /view-employee/create-registration-form
    async showCreateRegistrationForm(req, res, next) {
        const pool = await conn;
        const query1 = 'select MAKH, HOTENKH, CMND, DIACHI from KHACHHANG';
        const query2 = 'select * from TRUNGTAMTIEMCHUNG';
        const query3 = 'select * from VACXIN';
        const query4 = 'select MAGOI, TENGOI from GOIVACXIN';
        // await pool.request()
        // .query(query2)
        // .then(result => {
        //     res.render('employee-view/employee_view_create_registration_form', {
        //         Customers: result.recordset,
        //     });
        // });

        Promise.all([pool.request().query(query1), pool.request().query(query2), pool.request().query(query3), pool.request().query(query4)])
        .then(([result1, result2, result3, result4]) => {
            res.render('employee-view/employee_view_create_registration_form', {
                Customers: result1.recordset,
                Centers: result2.recordset,
                Vaccines: result3.recordset,
                VaccineGroups: result4.recordset,
            });
        });
    }

    //[POST] /view-employee/order/store
    async storeOrder(req, res, next) {
        const pool = await conn;
        let createDay = new Date();
        await pool.request()
        .input('makh', sql.Int, req.body.customerID)
        .input('tenVC', sql.NVarChar, req.body.nameVC)
        .input('slVC', sql.Int, req.body.countVC)
        .input('motaVC', sql.NVarChar, req.body.discriptionVC)
        .input('ngaydukien', sql.Date, req.body.dateExpected)
        .input('ngaylap', sql.Date, createDay)
        .execute('sp_InsertPhieuDatMua_KH', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('back');
            }
        });
    }

    //[POST] /view-employee/registration-form/store
    async storeRegistrationForm(req, res, next) {
        const pool = await conn;
        let createDay = new Date();
        if(req.body.vacxinID != ''){
            await pool.request()
            .input('matt', sql.Int, req.body.centerID)
            .input('manv', sql.Int, 7)
            .input('makh', sql.Int, req.body.customerID)
            .input('hinhthuc', sql.NVarChar, req.body.injection_method)
            .input('ngaylap', sql.Date, createDay)
            .input('dangkychobt', sql.Int, req.body.inlineRadioOptions1)
            .input('mavc', sql.Int, req.body.vacxinID)
            .execute('sp_Insert_PDKT_VacXin', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/view-employee/view-registration-list');
                }
            })
        }
        else {
            await pool.request()
            .input('matt', sql.Int, req.body.centerID)
            .input('manv', sql.Int, 7)
            .input('makh', sql.Int, req.body.customerID)
            .input('hinhthuc', sql.NVarChar, req.body.injection_method)
            .input('ngaylap', sql.Date, createDay)
            .input('dangkychobt', sql.Int, req.body.inlineRadioOptions1)
            .input('magoi', sql.Int, req.body.vacxinGroupID)
            .execute('sp_Insert_PDKT_GoiVacXin', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/view-employee/view-registration-list');
                }
            })
        }
    }
}

module.exports = new EmployeeController();

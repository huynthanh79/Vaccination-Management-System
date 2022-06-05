var sql = require('mssql');

const config = {
    user:"sa",
    password:"abc123",
    server: 'localhost',
    database:"HETHONGTIEMCHUNG",
    options:{
        trustedconnection: true,
        enableArithAbort: true,
        instancename:"SQLEXPRESS",
        trustServerCertificate: true
    },
    port: 1433,
    driver: "msnodesqlv8",
}

const conn = new sql.ConnectionPool(config);

conn.connect().then(pool => {
    console.log('Connected!!!');
    return pool;
})
.catch(err => console.log('Error connecting', err));

module.exports = {
    conn: conn,
    sql: sql
}
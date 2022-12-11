const connection = require("../dbConnect/connect")

const newCustomer = (req, res) => {
    const payload = req.body;


    let sql = `INSERT INTO customer(cust_id, first_name, middle_name,last_name,bank_account,email)
            VALUES(${payload.id},"${payload.fname}","${payload.mname}","${payload.lname}","${payload.bank_account}","${payload.email}");`
    try {
        connection.query(sql)
    } catch (error) {
        console.log(error)
    }
    payload.addresses.forEach(address => {
        let sql2 = `INSERT INTO cust_add(cust_id,address)
                VALUE(${payload.id},"${address.text}");`

        try {
            connection.query(sql2)
        } catch (error) {
            console.log(error)
        }
    });




    payload.contacts.forEach(contact => {
        let sql3 = `INSERT INTO cust_cont(cust_id,contact)
                VALUE(${payload.id},"${contact}");`

        try {
            connection.query(sql3)
        } catch (error) {
            console.log(error)
        }
    });

    let work = payload.work;
    let companies = work.companies
    let wkAdd = work.addresses
    let wkConts = work.contacts

    for (let i = 0; i < companies.length; i++) {
        let sql4 = `INSERT INTO cust_work(cust_id,contact,address,company_name)
                VALUE(${payload.id},"${wkConts[i]}","${wkAdd[i]}","${companies[i]}");`

        try {
            connection.query(sql4)
        } catch (error) {
            console.log(error)
        }
    }

    res.status(200).json({ msg: "Customer created succesfully" })
}

const getCustomer = (req, res) => {
    let id = req.query.id

    let sql = `SELECT first_name, middle_name, last_name FROM customer where cust_id=${id};`
    try {
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ result: result[0] })
        });
    } catch (error) {
        console.log(error)
    }
}

const getAllCustomers = (req, res) => {
    try {
        connection.query(`SELECT * FROM customer`, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ result })
        });

    } catch (error) {
        console.log(error)
    }
}

const getCustConts = (req, res) => {
    const id = req.query.id
    try {
        connection.query(`SELECT * FROM cust_cont WHERE cust_id=${id}`, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ result })
        });

    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    newCustomer,
    getCustomer,
    getAllCustomers,
    getCustConts
}
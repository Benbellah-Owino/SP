const connection = require("../dbConnect/connect")
const { hashpassword, compare } = require("../middleware/bcryptMod")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signToken, sendToken } = require("../middleware/jwtFunc")
const auth = require("../middleware/auth")

//REGISTER USER  [ADMIN FUNCTION]
const createUser = async (req, res) => {

    const payload = req.body
    const { password } = payload
    try {

        let verify = await auth(req, res)
        console.log(verify)

        if (verify.role != "admin") {
            return res.status(404).json({ msg: 'Not authorised' })
        }
    } catch (error) {
        console.log(error)
    }


    console.log(payload)
    try {
        hashpassword(password).then((result) => {
            connection.query(`INSERT INTO password(id,password,emp_type)
                            VALUES(${payload.id},"${result}","${payload.employeeType}");`)
        })
    } catch (error) {

    }

    if (payload.employeeType == "Driver") {
        let sql = `INSERT INTO DRIVER(dri_id,first_name,middle_name,surname,salary,DO_birth,DO_hire,email,car_reg)
                VALUES(${payload.id},"${payload.firstName}","${payload.middleName}","${payload.sNameField}",${payload.salary},STR_TO_DATE('${payload.DOB}','%Y/%m/%d'),STR_TO_DATE('${payload.DOH}','%Y-%m-%d'),"${payload.email}","${payload.car_reg}");`

        try {
            connection.query(sql, function (err, result, fields) {
                if (err) {
                    return res.status(200).json({ msg: "User is not created", status: "fail" })
                };
                console.log("step 1 success")
            });
        } catch (error) {
            console.log(error)
        }
    }
    else if (payload.employeeType == "Salesman") {
        let sql = `INSERT INTO Sales_Person(sp_id,first_name,middle_name,surname,no_of_sales,salary,DO_birth,DO_hire,email)
                VALUES(${payload.id},"${payload.firstName}","${payload.middleName}","${payload.sNameField}",${payload.sales},${payload.salary},STR_TO_DATE('${payload.DOB}','%Y/%m/%d'),STR_TO_DATE('${payload.DOH}','%Y-%m-%d'),"${payload.email}");`

        connection.query(sql, function (err, result, fields) {
            if (err) {
                return res.status(200).json({ msg: "User is not created", status: "fail" })
            };
            console.log("step 1 success")
        })
    }
    else {
        let sql = `INSERT INTO employee(emp_id,first_name,middle_name,last_name,role,salary,DO_birth,DO_hire,email)
                VALUES(${payload.id},"${payload.firstName}","${payload.middleName}","${payload.sNameField}","${payload.employeeType}",${payload.salary},STR_TO_DATE('${payload.DOB}','%Y/%m/%d'),STR_TO_DATE('${payload.DOH}','%Y-%m-%d'),"${payload.email}");`


        connection.query(sql, function (err, result, fields) {
            if (err) {
                return res.status(200).json({ msg: "User is not created", status: "fail" })
            };
            console.log("step 1 success")
        });
    }

    payload.contacts.forEach(contact => {
        let sql = `INSERT INTO emp_cont(emp_id, contact)
                VALUES(${payload.id},${contact});`

        connection.query(sql, function (err, result, fields) {
            if (err) {
                return res.status(200).json({ msg: "User is not created", status: "fail" })
            };
            console.log("step 2 success")
        });

    });

    payload.addresses.forEach(address => {
        let sql = `INSERT INTO emp_addr(emp_id, address)
                VALUES(${payload.id},${address});`

        connection.query(sql, function (err, result, fields) {
            if (err) {
                return res.status(200).json({ msg: "User is not created", status: "fail" })
            };
            console.log("step 3 success")
        });
    });
    res.status(200).json({ msg: "user created successfully", status: "success" })
}

//GET GENERAL EMPLOYEE
const getGen = (req, res) => {
    try {
        connection.query(`SELECT * FROM employee;`, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ payload: result })
        });
    } catch (error) {
        console.log(error)
    }
}

//GET DRIVER
const getDriv = (req, res) => {
    try {
        connection.query(`SELECT * FROM driver;`, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ payload: result })
        });
    } catch (error) {
        console.log(error)
    }
}

//GET SALESMAN
const getSp = async (req, res) => {
    try {
        connection.query(`SELECT * FROM sales_person;`, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ payload: result })
        });
    } catch (error) {
        console.log(error)
    }
}


//GET USER INFO

const getUserInfo = async (req, res) => {

    let payload;
    let user = await auth(req, res)

    let sql1 = (`SELECT * FROM EMPLOYEE WHERE emp_id=${user.id};`)
    let sql2 = (`SELECT * FROM driver WHERE dri_id=${user.id};`)
    let sql3 = (`SELECT * FROM sales_person WHERE sp_id=${user.id};`)

    try {
        if (user.role == "driver") {
            try {
                connection.query(sql2, async function (error, result, fields) {

                    res.status(200).json({ result })
                })
            } catch (error) {
                console.log()
            }
        }
        else if (user.role == "salesman") {
            try {
                connection.query(sql3, async function (error, result, fields) {

                    res.status(200).json({ result })
                })
            } catch (error) {
                console.log()
            }
        }
        else {
            try {
                connection.query(sql1, async function (error, result, fields) {

                    res.status(200).json({ result })
                })
            } catch (error) {
                console.log()
            }
        }
    } catch (error) {
        console.log(error)
    }

}

const getOneDriv = async (req, res) => {
    let userid = req.query.id

    let sql2 = (`SELECT * FROM driver WHERE dri_id=${userid};`)
    try {
        connection.query(sql2, async function (error, result, fields) {

            res.status(200).json({ result: result[0] })
        })
    } catch (error) {
        console.log()
    }
}
const getOneSales = async (req, res) => {
    let userid = req.query.id

    let sql3 = (`SELECT * FROM sales_person WHERE sp_id=${userid};`)
    try {
        connection.query(sql3, async function (error, result, fields) {

            res.status(200).json({ result: result[0] })
        })
    } catch (error) {
        console.log()
    }
}


const getAddr = async (req, res) => {
    let user = await auth(req, res)

    let sql1 = (`SELECT * FROM EMP_ADDR WHERE emp_id=${user.id};`)

    try {
        connection.query(sql1, async function (error, result, fields) {
            res.status(200).json({ result })
        })
    } catch (error) {
        res.status(500).json({ result: "Server error" })
    }
}
const getConts = async (req, res) => {
    let user = await auth(req, res)

    let sql1 = (`SELECT * FROM EMP_CONT WHERE emp_id=${user.id};`)

    try {
        connection.query(sql1, async function (error, result, fields) {
            res.status(200).json({ result })
        })
    } catch (error) {
        res.status(500).json({ result: "Server error" })
    }
}

//LOGIN ROUTE
const login = async (req, res) => {
    const payload = req.body;
    const passSql = `SELECT * FROM password WHERE id=${payload.id}`
    let passPKG;
    try {
        //Get user from database and hashed password
        connection.query(passSql, async function (error, result, fields) {

            passPKG = result

            if (passPKG) {
                let pkg = passPKG[0]

                //Compare hashed password and user input password
                let hashed = pkg.password;

                let confirm = await bcrypt.compare(payload.password, hashed)

                if (!confirm) {
                    res.status(400).json({ msg: "invalid credentials", status: "Unauthorized" })
                }
                else {
                    if (pkg.emp_type == "Salesman") {
                        connection.query(`SELECT * FROM sales_person WHERE sp_id=${pkg.id};`, async function (error, result, fields) {
                            let user = result[0]
                            let username = `${user.first_name} ${user.middle_name} ${user.surname}`
                            const token = signToken(user.sp_id, username, "salesman")
                            sendToken(res, token);
                            res.status(200).json({
                                msg: user, status: "Authorized", role: "salesperson"
                            })
                        })
                    }
                    else if (pkg.emp_type == "Driver") {
                        connection.query(`SELECT * FROM driver WHERE dri_id=${pkg.id};`, async function (error, result, fields) {
                            let user = result[0]
                            let username = `${user.first_name} ${user.middle_name} ${user.surname}`
                            const token = signToken(user.dri_id, username, "driver")
                            sendToken(res, token);
                            res.status(200).json({
                                msg: user, status: "Authorized", role: "driver"
                            })
                        })
                    }
                    else {
                        connection.query(`SELECT * FROM employee WHERE emp_id=${pkg.id};`, async function (error, result, fields) {
                            let user = result[0]
                            console.log(user.emp_id)
                            let username = `${user.first_name} ${user.middle_name} ${user.last_name}`
                            const token = signToken(user.emp_id, username, user.role)
                            sendToken(res, token);
                            res.status(200).json({
                                msg: user, status: "Authorized", role: user.role
                            })
                        })
                    }
                }


            }
            else {
                console.log("Invalid credentials")
            }

        });


    } catch (error) {
        console.log(error)
    }
}

const logout = (req, res) => {
    res.clearCookie("authtoken")
}
module.exports = {
    getUserInfo,
    createUser,
    login,
    getDriv,
    getGen,
    getSp,
    logout,
    getConts,
    getAddr,
    getOneDriv,
    getOneSales
}
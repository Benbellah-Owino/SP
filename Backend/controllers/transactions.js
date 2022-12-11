const connection = require("../dbConnect/connect")
const UUID = require("uuidv1")
const date_stamp = require("../middleware/getDate")
const auth = require("../middleware/auth")



const hire = async (req, res) => {
    let payload = req.body;
    let user = await auth(req, res)
    let driver = user.id
    if (user.role != "driver") {
        return res.status(404).json({ msg: "Not Authorized" })
    }


    let id = UUID()

    let sql = `INSERT INTO hire_trans(trans_id,cust_id,car_reg,dri_id,days_hired,price_pd,date_stamp,payments_made)
            VALUES("${id}",${payload.cust_id},"${payload.carReg}",${driver},${payload.days},${payload.price},STR_TO_DATE('${payload.DOT}','%Y-%m-%d'),${payload.made});`

    try {
        connection.query(sql, async function (error, result, fields) {
            if (error) {
                console.log(error)
                return res.status(400).json({ msg: "transaction not succesfull", status: "fail" })
            }
            return res.status(200).json({ msg: "transaction succesfull", status: "successful" })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "transaction not succesfull", status: "fail" })
    }
}

const sale = async (req, res) => {
    let payload = req.body;
    let id = UUID()

    let user = await auth(req, res)

    let slid = user.id
    if (user.role != "salesman") {
        return res.status(404).json({ msg: "Not Authorized" })
    }

    let sql = `INSERT INTO sales_trans(trans_id,cust_id,car_id,sp_id,payment_type,no_installments,deposit,price_pi,date_stamp,balance)
            VALUES("${id}",${payload.custID},"${payload.carId}",${slid},"${payload.type}",${payload.installments},${payload.deposit},${payload.price_pi},STR_TO_DATE('${payload.DOT}','%Y-%m-%d'),${payload.balance});`

    let sql2 = `DELETE FROM sale_cars WHERE car_id="${payload.carId}";`
    let sql3 = `INSERT INTO sold_cars(car_id,trans_id,make,model)
                VALUES("${payload.carId}","${id}","${payload.make}","${payload.model}")`

    try {
        connection.query(sql, async function (error, result, fields) {
            console.log(result)

            if (result) {

                //Send car to sold cars table 
                connection.query(sql3, async function (error, result, fields) {
                    if (error) {
                        console.log(error)
                        return res.status(400).json({ msg: "transaction not succesfull", status: "fail" })
                    }
                    //Delete car from inventory
                    else {
                        connection.query(sql2, async function (error, result, fields) {
                            if (error) {
                                console.log(error)
                                return res.status(400).json({ msg: "transaction not succesfull", status: "fail" })
                            }
                            else {
                                res.status(200).json({ msg: "transaction succesfull", status: "success" })
                            }
                        })
                    }
                })


            } else if (error) {
                console.log(error)
                res.status(400).json({ msg: "transaction not succesfull", status: "fail" })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const getHire = async (req, res) => {
    let sql = `SELECT * FROM hire_trans;`

    try {
        connection.query(sql, async function (error, result, fields) {

            res.status(200).json({ result })
        })
    } catch (error) {
        console.log()
    }
}
const getSale = async (req, res) => {
    let sql = `SELECT * FROM sales_trans;`

    try {
        connection.query(sql, async function (error, result, fields) {

            res.status(200).json({ result })
        })
    } catch (error) {
        console.log()
    }
}

//Update Hire
const updateHire = async (req, res) => {
    let user = await auth(req, res)
    if (user.role != "driver") {
        return res.status(404).json({ msg: "Not Authorized", status: "fail" })
    }
    const { id, payments, userID } = req.body

    if (user.id != userID) {
        return res.status(404).json({ msg: "Not Authorized", status: "fail" })
    }

    let sql = `SELECT payments_made FROM hire_trans WHERE trans_id="${id}";`

    try {
        connection.query(sql, async function (error, result, fields) {
            if (error) {
                console.log(error)
                return res.status(400).json({ msg: "transaction not succesfull", status: "fail" })
            }
            pay = result[0].payments_made

            console.log(pay)
            let newPay = pay + payments;

            let sql2 = `UPDATE hire_trans
        SET payments_made=${newPay}
        WHERE trans_id="${id}";`

            connection.query(sql2, async function (error, result, fields) {
                if (error) {
                    console.log(error)
                    return res.status(400).json({ msg: "transaction not succesfull", status: "fail" })
                }
                res.status(200).json({ msg: "Update Succesfull", status: "success" })
            })

        }
        )

    } catch (error) {
        console.log(error)
    }
}

const updateSale = async (req, res) => {
    let user = await auth(req, res)

    const { id, payments, userID } = req.body

    if (user.role != "salesman") {
        return res.status(404).json({ msg: "Not Authorized" })
    }

    if (user.id != userID) {
        return res.status(404).json({ msg: "Not Authorized", status: "fail" })
    }



    let sql = `SELECT balance FROM sales_trans WHERE trans_id="${id}";`

    try {
        connection.query(sql, async function (error, result, fields) {
            if (error) {
                console.log(error)
                return res.status(400).json({ msg: "transaction not succesfull", status: "fail" })
            }
            balance = result[0].balance

            console.log(balance)
            let newbalance = balance - payments;

            let sql2 = `UPDATE sales_trans
        SET balance =${newbalance}
        WHERE trans_id="${id}";`

            connection.query(sql2, async function (error, result, fields) {
                if (error) {
                    console.log(error)
                    return res.status(400).json({ msg: "transaction not succesfull", status: "fail", balance: newbalance })
                }
                res.status(200).json({ msg: "Update Succesfull", status: "success" })
            })

        }
        )
        // let balance = connection.query(sql)
        // let newPay = balance - payments;

        // let sql2 = `UPDATE sales_trans
        // SET balance =${newPay}
        // WHERE trans_id=${id};`

        // connection.query(sql2)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    hire,
    sale,
    updateHire,
    updateSale,
    getHire,
    getSale,
}
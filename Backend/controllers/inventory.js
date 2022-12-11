const connection = require("../dbConnect/connect")
const auth = require("../middleware/auth")

const newInventory = (req, res) => {
    const payload = req.body;
    const perf = payload.perfomance
    const lux = payload.luxury
    const driv = payload.driver

    const sql2 = `INSERT INTO perfomance(car_id,engine_cap,hp,transmission,tourque,fuel_type,engine_config)
                VALUES('${payload.car_reg}',${perf.engineCC},${perf.power},'${perf.transmission}',${perf.tourque},'${perf.fuel}','${perf.config}');`

    const sql3 = `INSERT INTO luxury(car_id,multi_air,driver_electric_seat,pass_electric_seat,kd_r_seats,heat_f_seats,heated_r_seats,sound_system,mass_f_seats,mass_r_seats,keyless_entry,HUD,wireless_charging)
                    VALUES('${payload.car_reg}',${lux.multi_zone_aircon},${lux.driver_elec_seat},${lux.pass_elec_seat},${lux.knockdown_rear_seats},${lux.heated_front_seats},${lux.heated_rear_seats},${lux.sound_system},${lux.massaging_front_seats},${lux.massaging_rear_seats},${lux.keyless_entry},${lux.HUD},${lux.wireless_charging_pad});`

    const sql4 = `INSERT INTO driverfeatures(car_id,lane_assist,starting_type,blindsport_alert,cruise_ctrl,nav_system,rev_sens,dash_cam,cam_360,auto_e_brake,fwrd_coll,steering_type)
                    VALUES('${payload.car_reg}',${driv.lane_Assist},'${driv.starting_Type}',${driv.blindspot_Warning},${driv.cruise_control},${driv.nav_system},${driv.reverse_sensors},${driv.dash_cam},${driv.camera_360},${driv.auto_emergency_braking},${driv.forward_collision_warning},'${driv.steering_type}');`
    if (payload.category == "hire") {
        const sql = `INSERT INTO hire_cars(car_reg,make,model,color,YOM,price_pd,mileage,type)
                VALUES ('${payload.car_reg}','${payload.make}','${payload.model}','${payload.color}',${payload.yom},${payload.hire_price},'${payload.mileage}','${payload.body_type}');`

        try {
            connection.query(sql)
            connection.query(sql2)
            connection.query(sql3)
            connection.query(sql4)
        } catch (error) {
            console.log(error)
        }
    }
    else if (payload.category == "sale") {
        const sql = `INSERT INTO sale_cars(car_id,make,model,color,YOM,price,mileage,type)
                VALUES ('${payload.car_reg}','${payload.make}','${payload.model}','${payload.color}','${payload.yom}',${payload.sale_price},${payload.mileage},'${payload.body_type}');`

        try {
            connection.query(sql)
            connection.query(sql2)
            connection.query(sql3)
            connection.query(sql4)
        } catch (error) {
            console.log(error)
        }
    }

    res.status(200).json({ msg: "Operation succesful" })
}

const getHireCars = (req, res) => {
    auth(req, res)

    connection.query("SELECT * FROM hire_cars;", function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({ result })
    });
}

const getSaleCars = (req, res) => {
    auth(req, res)
    connection.query("SELECT * FROM sale_cars;", function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({ result })
    });
}

const getCarDetails = (req, res) => {
    const { type, id } = req.body;

    let luxsql = `SELECT * FROM luxury WHERE car_id=${id}`
    let drivsql = `SELECT * FROM driverfeatures WHERE car_id=${id}`
    let persql = `SELECT * FROM perfomance WHERE car_id=${id}`

    try {
        let lux = connection.query(luxsql);
        let driv = connection.query(drivsql);
        let per = connection.query(persql);

        res.status(200).json({ lux, driv, per })
    } catch (error) {
        console.log(error)
    }
}

const getOneCar = (req, res) => {
    const id = req.query.id;
    const category = req.query.category;


    if (category == "sale") {
        connection.query(`SELECT * FROM sale_cars WHERE car_id="${id}";`, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ result })
        });
    }
    else if (category == "hire") {
        connection.query(`SELECT * FROM hire_cars WHERE car_reg="${id}";`, function (err, result, fields) {
            if (err) throw err;

            res.status(200).json({ result })
        });
    }
}

const getLuxDetails = (req, res) => {
    let id = req.query.id
    try {
        connection.query(`SELECT * FROM luxury WHERE car_id="${id}";`, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ result })
        });
    } catch (error) {
        console.log(error)
    }
}

const getDriDetails = (req, res) => {
    let id = req.query.id
    try {
        connection.query(`SELECT * FROM driverfeatures WHERE car_id="${id}";`, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ result })
        });
    } catch (error) {
        console.log(error)
    }
}

const getPerDetails = (req, res) => {
    let id = req.query.id
    try {
        connection.query(`SELECT * FROM perfomance WHERE car_id="${id}";`, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ result })
        });
    } catch (error) {
        console.log(error)
    }
}


const getSoldCars = async (req, res) => {
    try {
        auth(req, res)

        connection.query("SELECT * FROM sold_cars;", function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({ result })
        });
    } catch (error) {
        res.status(200).json({ result: error })
    }
}

module.exports = {
    getCarDetails,
    getHireCars,
    getSaleCars,
    newInventory,
    getOneCar,
    getLuxDetails,
    getDriDetails,
    getPerDetails,
    getSoldCars
}
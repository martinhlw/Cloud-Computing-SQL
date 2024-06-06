const mysql = require('promise-mysql');

// createUnixSocketPool initializes a Unix socket connection pool for
// a Cloud SQL instance of MySQL.
const createUnixSocketPool = async config => {
  return mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    socketPath: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
  });
};

let pool;
(async () => {
    pool = await createUnixSocketPool();
})();

// Insert food function
const insertFood = async (request, h) => {
    const { nama_makanan, bahan, cara_memasak, photo_url } = request.payload;
    try {
        const query = 'INSERT INTO data_makanan(nama_makanan, bahan, cara_memasak, photo_url) VALUES (?, ?, ?, ?)';
        const queryResult = await pool.query(query, [nama_makanan, bahan, cara_memasak, photo_url]);
        const response = h.response({
            status: 'success',
            message: 'Data makanan berhasil diinput'
        });
        response.code(200);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            result: error.message,
        });
        response.code(400);
        return response;
    }
}

// Get foods function
const getFoods = async (request, h) => {
    try {
        const query = 'SELECT * FROM data_makanan';
        const queryResult = await pool.query(query);
        const response = h.response({
            status: 'success',
            result: queryResult
        });
        response.code(200);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            result: error.message,
        });
        response.code(400);
        return response;
    }
}

// Get cooking instructions function
const getCookingInstructions = async (request, h) => {
    const { id } = request.params;
    try {
        const query = 'SELECT cara_memasak FROM data_makanan WHERE makanan_id = ?';
        const queryResult = await pool.query(query, [id]);
        const response = h.response({
            status: 'success',
            result: queryResult
        });
        response.code(200);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            result: error.message,
        });
        response.code(400);
        return response;
    }
}

// Get Indonesian food names function
const getIndonesianFoodNames = async (request, h) => {
    try {
        const query = 'SELECT nama_makanan FROM data_makanan';
        const queryResult = await pool.query(query);
        const response = h.response({
            status: 'success',
            result: queryResult
        });
        response.code(200);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            result: error.message,
        });
        response.code(400);
        return response;
    }
}

// Get detected food ingredients function
const getDetectedFoodIngredients = async (request, h) => {
    const { id } = request.params;
    try {
        const query = 'SELECT bahan FROM data_makanan WHERE makanan_id = ?';
        const queryResult = await pool.query(query, [id]);
        const response = h.response({
            status: 'success',
            result: queryResult
        });
        response.code(200);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            result: error.message,
        });
        response.code(400);
        return response;
    }
}

// Scan food from camera function
const scanFoodFromCamera = async (request, h) => {
    // Implementasi untuk memindai makanan dari kamera
    // Misalnya menggunakan layanan pihak ketiga untuk pemrosesan gambar
    const response = h.response({
        status: 'success',
        message: 'Fitur pemindaian makanan belum diimplementasikan'
    });
    response.code(200);
    return response;
}

// Existing functions
const convertBinary = async (request, h) => {
    const { data } = request.payload;
    let resultBinary = '';
    if (typeof data !== 'number' || !Number.isInteger(data)) {
        const response = h.response({
            status: 'fail',
            message: 'Input harus angka dan bilangan bulat!',
        });
        response.code(400);
        return response;
    }
    if (data === 0) {
        resultBinary = '0';
    } else {
        let num = data;
        while(num > 0) {
            resultBinary = (num % 2) + resultBinary;
            num = Math.floor(num / 2);
        }
    }
    const response = h.response({
        status: 'success',
        result: resultBinary,
    });
    response.code(200);
    return response;
}

const fibonacci = async (request, h) => {
    const { n } = request.payload;
    let num = n;
    let num1 = 0, num2 = 1;
    function add_fibonacci (i) {
        if (i == 1) {
            return 0;
        } else if (i == 2) {
            return 1;
        } else {
            while(i != 2){
                total = num1 + num2;
                num1 = num2;
                num2 = total;
                i--;
            }
            return total;
        }
    }
    resultFibo = add_fibonacci(num);
    const response = h.response({
        status: 'success',
        result: resultFibo,
    });
    response.code(200);
    return response;
}

module.exports = {
    convertBinary,
    fibonacci,
    insertFood,
    getFoods,
    getCookingInstructions,
    getIndonesianFoodNames,
    getDetectedFoodIngredients,
    scanFoodFromCamera,
}

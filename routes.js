const {
    convertBinary,
    fibonacci,
    insertFood,
    getFoods,
    getCookingInstructions,
    getIndonesianFoodNames,
    getDetectedFoodIngredients,
    scanFoodFromCamera
} = require('./handler.js');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello, world!';
        }
    },
    {
        path: '/test',
        method: 'GET',
        handler: (request, h) => {
            const response = h.response({
                status: 'success',
                message: 'testing',
            });
            response.code(200);
            return response;
        }
    },
    {
        path: '/convert-binary',
        method: 'POST',
        handler: convertBinary
    },
    {
        path: '/fibonacci',
        method: 'POST',
        handler: fibonacci
    },
    {
        path: '/insertFoods',
        method: 'POST',
        handler: insertFood
    },
    {
        path: '/getFoods',
        method: 'GET',
        handler: getFoods
    },
    {
        path: '/cooking-instructions/{id}',
        method: 'GET',
        handler: getCookingInstructions
    },
    {
        path: '/indonesian-food-names/{id}',
        method: 'GET',
        handler: getIndonesianFoodNames
    },
    {
        path: '/detected-food-ingredients/{id}',
        method: 'GET',
        handler: getDetectedFoodIngredients
    },
    {
        path: '/scan-food',
        method: 'POST',
        handler: scanFoodFromCamera
    }
];

module.exports = routes;

const { test, expect } = require('../../../fixtures');
const { CarsController } = require('../../../controllers/CarsController');

test.describe('POST /api/cars', () => {

    test('[Test][Positive] : Create car with valid data returns 200 and correct body', async ({ userApiContext }) => {
        const carsController = new CarsController(userApiContext);

        //Step 1: Send POST /api/cars with valid carBrandId, carModelId and mileage
        const response = await carsController.create({ carBrandId: 1, carModelId: 1, mileage: 122 });

        //Expected result: status code is 201
        expect(response.status()).toBe(201);

        //Expected result: response status is "ok" and returned car data matches sent values
        const body = await response.json();
        expect(body.status).toBe('ok');
        expect(body.data.carBrandId).toBe(1);
        expect(body.data.carModelId).toBe(1);
        expect(body.data.mileage).toBe(122);

        //Cleanup: delete created car to keep account clean
        await carsController.delete(body.data.id);
    });

    test('[Test][Negative] : Create car with non-existent carBrandId returns 400', async ({ userApiContext }) => {
        const carsController = new CarsController(userApiContext);

        //Step 1: Send POST /api/cars with carBrandId that does not exist
        const response = await carsController.create({ carBrandId: 999999, carModelId: 1, mileage: 122 });

        //Expected result: status code is 404
        expect(response.status()).toBe(404);

        //Expected result: response status is "error"
        const body = await response.json();
        expect(body.status).toBe('error');
    });

    test('[Test][Negative] : Create car without authentication returns 401', async ({ request }) => {
        const carsController = new CarsController(request);

        //Step 1: Send POST /api/cars without session cookie (unauthenticated request)
        const response = await carsController.create({ carBrandId: 1, carModelId: 1, mileage: 122 });

        //Expected result: status code is 401
        expect(response.status()).toBe(401);

        //Expected result: message indicates user is not authenticated
        const body = await response.json();
        expect(body.message).toBe('Not authenticated');
    });
});
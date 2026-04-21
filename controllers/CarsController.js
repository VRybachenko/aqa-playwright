class CarsController {
    /** @param {import('@playwright/test').APIRequestContext} request */
    constructor(request) {
        this.request = request;
    }

    /******************Brands******************/
    getBrands() {
        return this.request.get('/api/cars/brands');
    }

    getBrandById(id) {
        return this.request.get(`/api/cars/brands/${id}`);
    }

    /******************Models******************/
    getModels() {
        return this.request.get('/api/cars/models');
    }

    getModelById(id) {
        return this.request.get(`/api/cars/models/${id}`);
    }

    /******************Cars******************/
    getCars() {
        return this.request.get('/api/cars');
    }

    getCarById(id) {
        return this.request.get(`/api/cars/${id}`);
    }

    create(data) {
        return this.request.post('/api/cars', {data});
    }

    update(id, data) {
        return this.request.put(`/api/cars/${id}`, {data});
    }

    delete(id) {
        return this.request.delete(`/api/cars/${id}`);
    }
}

module.exports = {CarsController};
class GaragePanel {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.heading = page.locator('.panel-page h1');
        this.addCarButton = page.locator('.panel-page .btn-primary');
        this.emptyMessage = page.locator('.panel-empty_message');
        this.carList = page.locator('.car-list');
    }

    async clickAddCar() {
        await this.addCarButton.click();
    }
}

module.exports = { GaragePanel };
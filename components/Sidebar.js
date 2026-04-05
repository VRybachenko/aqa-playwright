class Sidebar {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.garageLink = page.locator('.sidebar a[href="/panel/garage"]');
        this.fuelExpensesLink = page.locator('.sidebar a[href="/panel/expenses"]');
        this.instructionsLink = page.locator('.sidebar a[href="/panel/instructions"]');
        this.logoutButton = page.locator('.sidebar .btn-sidebar.text-danger');
    }

    async clickGarage() {
        await this.garageLink.click();
    }

    async clickFuelExpenses() {
        await this.fuelExpensesLink.click();
    }

    async clickInstructions() {
        await this.instructionsLink.click();
    }

    async clickLogout() {
        await this.logoutButton.click();
    }
}

module.exports = { Sidebar };
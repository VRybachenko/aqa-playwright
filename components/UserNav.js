class UserNav {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.toggle = page.locator('.user-nav_toggle');
        this.menu = page.locator('.user-nav_menu');

        this.garageLink = page.locator('.user-nav_menu a[href="/panel/garage"]');
        this.fuelExpensesLink = page.locator('.user-nav_menu a[href="/panel/expenses"]');
        this.instructionsLink = page.locator('.user-nav_menu a[href="/panel/instructions"]');
        this.logoutButton = page.locator('.user-nav_menu button.user-nav_link');
    }

    async openMenu() {
        await this.toggle.click();
    }

    async logout() {
        await this.openMenu();
        await this.logoutButton.click();
    }
}

module.exports = { UserNav };
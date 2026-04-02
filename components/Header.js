class Header {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.logo = page.locator('.header_logo');

        // Home page nav (not logged in)
        this.homeLink = page.locator('.header_nav a.header-link');
        this.aboutButton = page.locator('.header_nav button[appscrollto="aboutSection"]');
        this.contactsButton = page.locator('.header_nav button[appscrollto="contactsSection"]');
        this.guestLoginButton = page.locator('.header-link.-guest');
        this.signInButton = page.locator('.header_signin');

        // Panel nav (logged in / guest logged in)
        this.guestBar = page.locator('.header_bar');
        this.garageLink = page.locator('.header_nav a[href="/panel/garage"]');
        this.fuelExpensesLink = page.locator('.header_nav a[href="/panel/expenses"]');
        this.instructionsLink = page.locator('.header_nav a[href="/panel/instructions"]');
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async clickGuestLogin() {
        await this.guestLoginButton.click();
    }

    async clickHome() {
        await this.homeLink.click();
    }

    async clickAbout() {
        await this.aboutButton.click();
    }

    async clickContacts() {
        await this.contactsButton.click();
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
}

module.exports = { Header };
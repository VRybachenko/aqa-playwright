class HomePage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.signUpButton = page.locator('//button[normalize-space()=\'Sign up\']');
    }

    async open() {
        await this.page.goto('/');
    }

    async clickSignUp() {
        await this.signUpButton.click();
    }
}

module.exports = { HomePage };
const {expect} = require('@playwright/test');

class SignupModal {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.modal = page.locator('.modal-content');
        this.title = page.locator('.modal-title');
        this.closeButton = page.locator('app-signup-modal button.close');

        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.locator('#signupPassword');
        this.repeatPasswordInput = page.locator('#signupRepeatPassword');

        this.registerButton = page.locator('.modal-footer button.btn-primary');

        this.nameError = page.locator('#signupName + .invalid-feedback p');
        this.lastNameError = page.locator('#signupLastName + .invalid-feedback p');
        this.emailError = page.locator('#signupEmail + .invalid-feedback p');
        this.passwordError = page.locator('#signupPassword + .invalid-feedback p');
        this.repeatPasswordError = page.locator('#signupRepeatPassword + .invalid-feedback p');
    }

    async fillName(name) {
        await this.nameInput.fill(name);
    }

    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async fillRepeatPassword(password) {
        await this.repeatPasswordInput.fill(password);
    }

    async register(name, lastName, email, password) {
        await this.fillName(name);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillRepeatPassword(password);
        await this.registerButton.click();
    }

    async expectToBeOpen() {
        await expect(this.modal).toBeVisible();
    }

    async close() {
        await this.closeButton.click();
    }
}

module.exports = {SignupModal};
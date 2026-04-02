const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { GaragePage } = require('../pages/GaragePage');
const { SignupModal } = require('../components/SignupModal');

const test = base.extend({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.open();
        await use(homePage);
    },

    garagePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.open();
        await homePage.header.clickGuestLogin();
        const garagePage = new GaragePage(page);
        await use(garagePage);
    },

    signupModal: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.open();
        await homePage.clickSignUp();
        const signupModal = new SignupModal(page);
        await signupModal.expectToBeOpen();
        await use(signupModal);
    },
});

module.exports = { test, expect };

const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { GaragePage } = require('../pages/GaragePage');
const { SignupModal } = require('../components/SignupModal');
const { STORAGE_STATE } = require('../test-data/constants');
const { ProfilePage } = require('../pages/ProfilePage');
const envConfig = require('../config/env.config');

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

    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: STORAGE_STATE });
        const page = await context.newPage();
        const garagePage = new GaragePage(page);
        await garagePage.open();
        await garagePage.garagePanel.heading.waitFor();
        await use(garagePage);
        await context.close();
    },

    userProfilePage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: STORAGE_STATE });
        const page = await context.newPage();
        const profilePage = new ProfilePage(page);
        await use(profilePage);
        await context.close();
    },

    userApiContext: async ({ playwright }, use) => {
        const apiContext = await playwright.request.newContext({
            baseURL: envConfig.baseUrl,
            httpCredentials: envConfig.httpCredentials,
            storageState: STORAGE_STATE,
        });
        await use(apiContext);
        await apiContext.dispose();
    },
});

module.exports = { test, expect };
const { test: setup } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');
const { SignupModal } = require('../../components/SignupModal');
const { generateUserData } = require('../../helpers/userGenerator');
const { STORAGE_STATE } = require('../../test-data/constants');

setup('register and authenticate user', async ({ page }) => {
    const { firstName, lastName, email, password } = generateUserData();

    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.clickSignUp();

    const signupModal = new SignupModal(page);
    await signupModal.register(firstName, lastName, email, password);

    await page.waitForURL('**/panel/garage');
    await page.context().storageState({ path: STORAGE_STATE });
});

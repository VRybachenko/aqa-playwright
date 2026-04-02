const { test, expect } = require('../../../fixtures');
const { SignupModal } = require('../../../components/SignupModal');

test.describe('Hero section', () => {
    test('[Test][Positive] : Hero title is visible and has correct text', async ({ homePage }) => {
        //Expected result: title "Do more!" is displayed
        await expect(homePage.hero.title).toBeVisible();
        await expect(homePage.hero.title).toHaveText('Do more!');
    });

    test('[Test][Positive] : Hero description is visible and has correct text', async ({ homePage }) => {
        //Expected result: description text is displayed
        await expect(homePage.hero.description).toBeVisible();
        await expect(homePage.hero.description).toHaveText('With the help of the Hillel auto project, you will have the opportunity to get hands-on experience in manual testing.');
    });

    test('[Test][Positive] : Hero Sign up button is visible and enabled', async ({ homePage }) => {
        //Expected result: Sign up button is visible and clickable
        await expect(homePage.hero.signUpButton).toBeVisible();
        await expect(homePage.hero.signUpButton).toBeEnabled();
    });

    test('[Test][Positive] : Hero Sign up button opens registration modal', async ({ homePage, page }) => {
        //Step 1: Click the Sign up button in the hero section
        await homePage.clickSignUp();

        //Expected result: registration modal appears
        const signupModal = new SignupModal(page);
        await expect(signupModal.modal).toBeVisible();
    });

    test('[Test][Positive] : Hero video iframe is visible', async ({ homePage }) => {
        //Expected result: YouTube iframe is displayed in the hero section
        await expect(homePage.hero.videoFrame).toBeVisible();
    });

    test('[Test][Positive] : Hero video iframe has correct src', async ({ homePage }) => {
        //Expected result: iframe src points to the correct YouTube video
        await expect(homePage.hero.videoFrame).toHaveAttribute('src', 'https://www.youtube.com/embed/znjjC0Iw8Wc?showinfo=0&controls=0');
    });
});

const { test, expect } = require('../../../fixtures');
const { SignupModal } = require('../../../components/SignupModal');

test.describe('Header', () => {
    test('[Test][Positive] : Logo is visible and links to home page', async ({ homePage }) => {
        //Expected result: logo is displayed and href points to "/"
        await expect(homePage.header.logo).toBeVisible();
        await expect(homePage.header.logo).toHaveAttribute('href', '/');
    });

    test('[Test][Positive] : Home navigation link is visible and active', async ({ homePage }) => {
        //Expected result: Home link is displayed and has active class
        await expect(homePage.header.homeLink).toBeVisible();
        await expect(homePage.header.homeLink).toHaveClass(/-active/);
    });

    test('[Test][Positive] : About navigation button is visible', async ({ homePage }) => {
        //Expected result: About button is visible and enabled
        await expect(homePage.header.aboutButton).toBeVisible();
        await expect(homePage.header.aboutButton).toBeEnabled();
    });

    test('[Test][Positive] : Contacts navigation button is visible', async ({ homePage }) => {
        //Expected result: Contacts button is visible and enabled
        await expect(homePage.header.contactsButton).toBeVisible();
        await expect(homePage.header.contactsButton).toBeEnabled();
    });

    test('[Test][Positive] : Guest log in button is visible and enabled', async ({ homePage }) => {
        //Expected result: Guest log in button is visible and clickable
        await expect(homePage.header.guestLoginButton).toBeVisible();
        await expect(homePage.header.guestLoginButton).toBeEnabled();
    });

    test('[Test][Positive] : Sign In button is visible and enabled', async ({ homePage }) => {
        //Expected result: Sign In button is visible and clickable
        await expect(homePage.header.signInButton).toBeVisible();
        await expect(homePage.header.signInButton).toBeEnabled();
    });

    test('[Test][Positive] : Sign up button opens registration modal', async ({ homePage, page }) => {
        //Step 1: Click the Sign-up button in the hero section
        await homePage.clickSignUp();

        //Expected result: registration modal appears
        const signupModal = new SignupModal(page);
        await expect(signupModal.modal).toBeVisible();
    });

    test('[Test][Positive] : Contacts button scrolls to contacts section', async ({ homePage, page }) => {
        //Step 1: Click the Contacts button in the navigation
        await homePage.header.clickContacts();

        //Expected result: contacts section becomes visible in the viewport
        await expect(page.locator('.contacts_socials')).toBeInViewport();
    });

    test('[Test][Positive] : About button scrolls to about section', async ({ homePage, page }) => {
        //Step 1: Click the About button in the navigation
        await homePage.header.clickAbout();

        //Expected result: about section becomes visible in the viewport
        await expect(page.locator('#aboutSection')).toBeInViewport();
    });

    test('[Test][Positive] : Home link navigates to home page', async ({ homePage, page }) => {
        //Step 1: Navigate away from the home page
        await page.goto('/panel/garage');

        //Step 2: Click the Home link in the navigation
        await homePage.header.clickHome();

        //Expected result: URL is the home page
        await expect(page).toHaveURL('/');
    });

    test('[Test][Positive] : Sign In button opens sign in modal', async ({ homePage, page }) => {
        //Step 1: Click the Sign In button in the header
        await homePage.header.clickSignIn();

        //Expected result: sign in modal appears
        await expect(page.locator('.modal-content')).toBeVisible();
    });

    test('[Test][Positive] : Guest log in redirects to garage page', async ({ homePage, page }) => {
        //Step 1: Click the Guest log in button in the header
        await homePage.header.clickGuestLogin();

        //Expected result: user is redirected to the garage page
        await expect(page).toHaveURL('/panel/garage');
    });
});

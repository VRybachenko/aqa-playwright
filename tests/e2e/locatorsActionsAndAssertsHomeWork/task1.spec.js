const {test, expect} = require('@playwright/test');
const {HomePage} = require('../../../pages/HomePage');
const {SignupModal} = require('../../../pages/SignupModal');
const {generateUserData} = require('../../../helpers/userGenerator');

test.describe('Registration modal', () => {
    let homePage;
    let signupModal;

    test.beforeEach(async ({page}) => {
        //Precondition: open home page and click Sign Up
        homePage = new HomePage(page);
        signupModal = new SignupModal(page);
        await homePage.open();
        await homePage.clickSignUp();
        await signupModal.expectToBeOpen();
    });

    test('[Test][Positive] : Successful registration', async () => {
        //Step 1: Generate random Marvel user data
        const {firstName, lastName, email, password} = generateUserData();

        //Step 2: Fill in the registration form and submit
        await signupModal.register(firstName, lastName, email, password);

        //Expected result: modal is closed after successful registration
        await expect(signupModal.modal).not.toBeVisible();
    });

    test('[Test][Negative] : Name field shows error for invalid characters (numbers)', async () => {
        //Step 1: Enter numbers in the Name field
        await signupModal.fillName('12345');

        //Step 2: Move focus to the next field to trigger validation
        await signupModal.fillLastName('Rogers');

        //Expected result: error message is shown and field is highlighted as invalid
        await expect(signupModal.nameError).toHaveText('Name is invalid');
        await expect(signupModal.nameInput).toHaveClass(/is-invalid/);
    });

    test('[Test][Negative] : Name field shows error when value is too short (1 character)', async () => {
        //Step 1: Enter a single character in the Name field
        await signupModal.fillName('A');

        //Step 2: Move focus to the next field to trigger validation
        await signupModal.fillLastName('Rogers');

        //Expected result: error message about length is shown and field is highlighted as invalid
        await expect(signupModal.nameError).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(signupModal.nameInput).toHaveClass(/is-invalid/);
    });

    test('[Test][Negative] : Email field shows error for incorrect email format', async () => {
        //Step 1: Generate valid name and password data
        const {firstName, lastName, password} = generateUserData();

        //Step 2: Fill in valid Name and Last Name fields
        await signupModal.fillName(firstName);
        await signupModal.fillLastName(lastName);

        //Step 3: Enter an invalid email format
        await signupModal.fillEmail('not-an-email');

        //Step 4: Move focus to the next field to trigger validation
        await signupModal.fillPassword(password);

        //Expected result: error message is shown and field is highlighted as invalid
        await expect(signupModal.emailError).toHaveText('Email is incorrect');
        await expect(signupModal.emailInput).toHaveClass(/is-invalid/);
    });

    test('[Test][Negative] : Password field shows error when password is too short (7 characters)', async () => {
        //Step 1: Generate valid user data
        const {firstName, lastName, email} = generateUserData();
        const INVALID_SHORT_PASSWORD = 'Aa1!567';

        //Step 2: Fill in valid Name, Last Name, and Email fields
        await signupModal.fillName(firstName);
        await signupModal.fillLastName(lastName);
        await signupModal.fillEmail(email);

        //Step 3: Enter a password that is too short (7 characters)
        await signupModal.fillPassword(INVALID_SHORT_PASSWORD);

        //Step 4: Move focus to the next field to trigger validation
        await signupModal.repeatPasswordInput.click();

        //Expected result: error message is shown and field is highlighted as invalid
        await expect(signupModal.passwordError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(signupModal.passwordInput).toHaveClass(/is-invalid/);
    });

    test('[Test][Negative] : Re-enter password shows error when passwords do not match', async () => {
        //Step 1: Generate valid user data
        const {firstName, lastName, email, password} = generateUserData();

        //Step 2: Fill in all fields with valid data
        await signupModal.fillName(firstName);
        await signupModal.fillLastName(lastName);
        await signupModal.fillEmail(email);
        await signupModal.fillPassword(password);

        //Step 3: Enter a different value in the Re-enter Password field
        await signupModal.fillRepeatPassword(password + 'X');

        //Step 4: Move focus away to trigger validation
        await signupModal.nameInput.click();

        //Expected result: error message is shown and field is highlighted as invalid
        await expect(signupModal.repeatPasswordError).toHaveText('Passwords do not match');
        await expect(signupModal.repeatPasswordInput).toHaveClass(/is-invalid/);
    });

    test('[Test][Negative] : Register button is disabled when all fields are empty', async () => {
        //Expected result: Register button is disabled by default with no input
        await expect(signupModal.registerButton).toBeDisabled();
    });
});
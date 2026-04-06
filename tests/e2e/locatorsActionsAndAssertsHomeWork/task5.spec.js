const { test, expect } = require('../../../fixtures');

test.describe('Garage page (guest)', () => {
    
    test('[Test][Positive] : Guest bar is visible with correct message', async ({ garagePage }) => {
        test.skip(process.env.ENV === 'qauto2', 'Guest bar not available on qauto2');

        //Expected result: warning bar is shown at the top of the header
        await expect(garagePage.header.guestBar).toBeVisible();
        await expect(garagePage.header.guestBar).toHaveText('Logged in as guest, any changes will be lost!');
    });

    test('[Test][Positive] : Header Garage link is visible and active @smoke', async ({ garagePage }) => {
        //Expected result: Garage link in header nav is displayed and marked as active
        await expect(garagePage.header.garageLink).toBeVisible();
        await expect(garagePage.header.garageLink).toHaveClass(/-active/);
    });

    test('[Test][Positive] : Header Fuel expenses link is visible', async ({ garagePage }) => {
        //Expected result: Fuel expenses link in header nav is visible
        await expect(garagePage.header.fuelExpensesLink).toBeVisible();
    });

    test('[Test][Positive] : Header Instructions link is visible', async ({ garagePage }) => {
        //Expected result: Instructions link in header nav is visible
        await expect(garagePage.header.instructionsLink).toBeVisible();
    });

    test('[Test][Positive] : User nav dropdown toggle is visible @smoke', async ({ garagePage }) => {
        //Expected result: "My profile" dropdown toggle is displayed in the header
        await expect(garagePage.userNav.toggle).toBeVisible();
    });

    test('[Test][Positive] : User nav dropdown opens on click', async ({ garagePage }) => {
        //Step 1: Click the user nav toggle
        await garagePage.userNav.openMenu();

        //Expected result: dropdown menu becomes visible
        await expect(garagePage.userNav.menu).toBeVisible();
    });

    test('[Test][Positive] : User nav dropdown contains Logout button', async ({ garagePage }) => {
        //Step 1: Open the user nav dropdown
        await garagePage.userNav.openMenu();

        //Expected result: Logout button is visible in the dropdown
        await expect(garagePage.userNav.logoutButton).toBeVisible();
    });

    test('[Test][Positive] : Sidebar Garage link is visible and active', async ({ garagePage }) => {
        //Expected result: Garage link in sidebar is displayed and marked as active
        await expect(garagePage.sidebar.garageLink).toBeVisible();
        await expect(garagePage.sidebar.garageLink).toHaveClass(/-active/);
    });

    test('[Test][Positive] : Sidebar Fuel expenses link is visible', async ({ garagePage }) => {
        //Expected result: Fuel expenses link in sidebar is visible
        await expect(garagePage.sidebar.fuelExpensesLink).toBeVisible();
    });

    test('[Test][Positive] : Sidebar Instructions link is visible', async ({ garagePage }) => {
        //Expected result: Instructions link in sidebar is visible
        await expect(garagePage.sidebar.instructionsLink).toBeVisible();
    });

    test('[Test][Positive] : Sidebar Log out button is visible', async ({ garagePage }) => {
        //Expected result: Log out button in sidebar is visible
        await expect(garagePage.sidebar.logoutButton).toBeVisible();
    });

    test('[Test][Positive] : Garage heading is correct @smoke', async ({ garagePage }) => {
        //Expected result: page heading displays "Garage"
        await expect(garagePage.garagePanel.heading).toHaveText('Garage');
    });

    test('[Test][Positive] : Add car button is visible and enabled @smoke', async ({ garagePage }) => {
        //Expected result: Add car button is displayed and clickable
        await expect(garagePage.garagePanel.addCarButton).toBeVisible();
        await expect(garagePage.garagePanel.addCarButton).toBeEnabled();
    });
});
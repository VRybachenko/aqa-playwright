const { test, expect } = require('../../../fixtures');

test.describe('Garage page (authorized user)', () => {

    test('[Test][Positive] : Authorized user sees Garage heading @smoke', async ({ userGaragePage }) => {
        //Expected result: page heading displays "Garage"
        await expect(userGaragePage.garagePanel.heading).toHaveText('Garage');
    });

    test('[Test][Positive] : Authorized user sees Add car button', async ({ userGaragePage }) => {
        //Expected result: Add car button is visible and enabled
        await expect(userGaragePage.garagePanel.addCarButton).toBeVisible();
        await expect(userGaragePage.garagePanel.addCarButton).toBeEnabled();
    });

    test('[Test][Positive] : Authorized user has no guest bar', async ({ userGaragePage }) => {
        //Expected result: guest warning bar is NOT visible for authenticated user
        await expect(userGaragePage.header.guestBar).not.toBeVisible();
    });
});
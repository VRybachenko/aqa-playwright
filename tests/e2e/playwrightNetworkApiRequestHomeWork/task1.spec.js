const { test, expect } = require('../../../fixtures');

const MOCKED_NAME = 'Bruce';
const MOCKED_LAST_NAME = 'Wayne';

test.describe('Profile page – mocked response body', () => {
    test('[Test][Positive] : Mocked name and lastName are displayed on profile page', async ({ userProfilePage }) => {
        //Step 1: Intercept GET /api/users/profile and replace name and lastName in the response body
        await userProfilePage.page.route('**/api/users/profile', async (route) => {
            const response = await route.fetch();
            const body = await response.json();

            body.data.name = MOCKED_NAME;
            body.data.lastName = MOCKED_LAST_NAME;

            await route.fulfill({ response, json: body });
        });

        //Step 2: Navigate to the profile page
        await userProfilePage.open();

        //Expected result: full name on the page matches the mocked values
        await expect(userProfilePage.profilePanel.fullName).toHaveText(`${MOCKED_NAME} ${MOCKED_LAST_NAME}`);
    });
});
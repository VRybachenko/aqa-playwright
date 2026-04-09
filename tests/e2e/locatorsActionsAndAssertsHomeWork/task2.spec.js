const { test, expect } = require('../../../fixtures');

test.describe('Footer social icons and contact links', () => {
    test('[Test][Positive] : Facebook icon is visible and has correct href @smoke', async ({ homePage }) => {
        //Expected result: Facebook link is visible and points to the correct URL
        await expect(homePage.footer.facebookLink).toBeVisible();
        await expect(homePage.footer.facebookLink).toHaveAttribute('href', 'https://www.facebook.com/Hillel.IT.School');
    });

    test('[Test][Positive] : Telegram icon is visible and has correct href @smoke', async ({ homePage }) => {
        //Expected result: Telegram link is visible and points to the correct URL
        await expect(homePage.footer.telegramLink).toBeVisible();
        await expect(homePage.footer.telegramLink).toHaveAttribute('href', 'https://t.me/ithillel_kyiv');
    });

    test('[Test][Positive] : YouTube icon is visible and has correct href', async ({ homePage }) => {
        //Expected result: YouTube link is visible and points to the correct URL
        await expect(homePage.footer.youtubeLink).toBeVisible();
        await expect(homePage.footer.youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1');
    });

    test('[Test][Positive] : Instagram icon is visible and has correct href', async ({ homePage }) => {
        //Expected result: Instagram link is visible and points to the correct URL
        await expect(homePage.footer.instagramLink).toBeVisible();
        await expect(homePage.footer.instagramLink).toHaveAttribute('href', 'https://www.instagram.com/hillel_itschool/');
    });

    test('[Test][Positive] : LinkedIn icon is visible and has correct href', async ({ homePage }) => {
        //Expected result: LinkedIn link is visible and points to the correct URL
        await expect(homePage.footer.linkedinLink).toBeVisible();
        await expect(homePage.footer.linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/school/ithillel/');
    });

    test('[Test][Positive] : All social icons open in a new tab @smoke', async ({ homePage }) => {
        //Expected result: all social links have target="_blank" to open in a new tab
        await expect(homePage.footer.facebookLink).toHaveAttribute('target', '_blank');
        await expect(homePage.footer.telegramLink).toHaveAttribute('target', '_blank');
        await expect(homePage.footer.youtubeLink).toHaveAttribute('target', '_blank');
        await expect(homePage.footer.instagramLink).toHaveAttribute('target', '_blank');
        await expect(homePage.footer.linkedinLink).toHaveAttribute('target', '_blank');
    });

    test('[Test][Positive] : Website link is visible and has correct href', async ({ homePage }) => {
        //Expected result: website link is visible and points to the correct URL
        await expect(homePage.footer.websiteLink).toBeVisible();
        await expect(homePage.footer.websiteLink).toHaveAttribute('href', 'https://ithillel.ua');
    });

    test('[Test][Positive] : Email link is visible and has correct href @smoke', async ({ homePage }) => {
        //Expected result: email link is visible and has correct mailto address
        await expect(homePage.footer.emailLink).toBeVisible();
        await expect(homePage.footer.emailLink).toHaveAttribute('href', 'mailto:developer@ithillel.ua');
    });
});
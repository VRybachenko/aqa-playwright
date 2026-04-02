class Footer {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.facebookLink = page.locator('a:has(.icon-facebook)');
        this.telegramLink = page.locator('a:has(.icon-telegram)');
        this.youtubeLink = page.locator('a:has(.icon-youtube)');
        this.instagramLink = page.locator('a:has(.icon-instagram)');
        this.linkedinLink = page.locator('a:has(.icon-linkedin)');

        this.websiteLink = page.locator('.contacts_link.display-4');
        this.emailLink = page.locator('.contacts_link.h4');
    }
}

module.exports = { Footer };
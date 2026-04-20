class ProfilePanel {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.fullName = page.locator('.profile_name');
    }
}

module.exports = { ProfilePanel };
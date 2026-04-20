const { BasePage } = require('./BasePage');
const { ProfilePanel } = require('../components/ProfilePanel');

class ProfilePage extends BasePage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        super(page, '/panel/profile');
        this.profilePanel = new ProfilePanel(page);
    }
}

module.exports = { ProfilePage };
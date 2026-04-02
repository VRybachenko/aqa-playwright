const { BasePage } = require('./BasePage');
const { Header } = require('../components/Header');
const { Footer } = require('../components/Footer');
const { Hero } = require('../components/Hero');

class HomePage extends BasePage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        super(page, '/');
        this.header = new Header(page);
        this.footer = new Footer(page);
        this.hero = new Hero(page);
    }

    async clickSignUp() {
        await this.hero.signUpButton.click();
    }
}

module.exports = { HomePage };
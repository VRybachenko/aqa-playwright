class BasePage {
    /** @param {import('@playwright/test').Page} page @param {string} path */
    constructor(page, path) {
        this.page = page;
        this.path = path;
    }

    async open() {
        await this.page.goto(this.path);
    }
}

module.exports = { BasePage };
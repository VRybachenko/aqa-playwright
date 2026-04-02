class Hero {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.title = page.locator('.hero-descriptor_title');
        this.description = page.locator('.hero-descriptor_descr');
        this.signUpButton = page.locator('.hero-descriptor_btn');
        this.videoFrame = page.locator('.hero-video_frame');
    }
}

module.exports = { Hero };
const { BasePage } = require('./BasePage');
const { Header } = require('../components/Header');
const { Sidebar } = require('../components/Sidebar');
const { GaragePanel } = require('../components/GaragePanel');
const { UserNav } = require('../components/UserNav');

class GaragePage extends BasePage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        super(page, '/panel/garage');
        this.header = new Header(page);
        this.sidebar = new Sidebar(page);
        this.garagePanel = new GaragePanel(page);
        this.userNav = new UserNav(page);
    }
}

module.exports = { GaragePage };
var data = require("../fixtures/cms_prio1.json");
var cmsPrio1_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


describe('Integration test with visual testing - cms prio1 pages', function () {

    cmsPrio1_pages.forEach(function (link) {

        it('load page: ' + link + ' & take argos snapshot', function () {

            cy.visit(link);

            cy.window().then(cyWindow => scrollToBottom({ frequency: 150, timing: 30, remoteWindow: cyWindow }));
            cy.scrollTo('top', { duration: 1000, ensureScrollable: false })

            cy.checkYouTube()
            cy.checkFreshChat()

            cy.argosScreenshot(link, {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });
        });
    })
})
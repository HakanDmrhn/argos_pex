var data = require("../fixtures/cms_prio2.json");
var cmsPrio2_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


describe('Integration test with visual testing - cms prio2 pages', function () {

    cmsPrio2_pages.forEach(function (link) {

        it('load page: ' + link + ' & take argos snapshot', function () {

            cy.visit(link);

            cy.window().then(cyWindow => scrollToBottom({ frequency: 100, timing: 20, remoteWindow: cyWindow }));
            cy.scrollTo('top', { duration: 500, ensureScrollable: false })

            cy.checkFreshChat()

            cy.argosScreenshot(link, {
                viewports: [
                  "iphone-6", // Use device preset for iphone-6
                  { width: 1280, height: 1024 }, // Specify dimensions directly
                ]
            });
        });
    })
})
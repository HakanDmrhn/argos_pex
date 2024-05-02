var data = require("../fixtures/product_pages.json");
var product_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


describe('Integration test with visual testing - product pages', function () {

    product_pages.forEach(function (link) {

        it('load page: ' + link + ' & take argos snapshot', function () {
            cy.visit(link);

            cy.window().then(cyWindow => scrollToBottom({ frequency: 150, timing: 30, remoteWindow: cyWindow }));
            cy.scrollTo('top', { duration: 1000, ensureScrollable: false })

            cy.checkYouTube()
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
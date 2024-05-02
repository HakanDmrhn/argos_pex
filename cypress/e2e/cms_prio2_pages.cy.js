var data = require("../fixtures/cms_prio2.json");
var cmsPrio2_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


describe('Integration test with visual testing - cms prio2 pages', function () {

    cmsPrio2_pages.forEach(function (link) {

        it('load page: ' + link + ' & take argos snapshot', function () {

            cy.visit(link);

            cy.window().then(cyWindow => scrollToBottom({ frequency: 100, timing: 30, remoteWindow: cyWindow }));
            cy.scrollTo('top', { duration: 1000, ensureScrollable: false })

            cy.checkYouTube()
            cy.checkFreshChat()

            // special treatment for link '/ratgeber/plisseetyp' --> ignore gifs
            if(link == '/ratgeber/plisseetyp') {
                cy.get('.gallery_image').invoke('attr', 'data-visual-test', 'transparent');
            }

            cy.argosScreenshot(link, {
                viewports: [
                  "iphone-6", // Use device preset for iphone-6
                  { width: 1280, height: 1024 }, // Specify dimensions directly
                ]
            });
        });
    })
})
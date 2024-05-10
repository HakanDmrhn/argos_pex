let scrollToBottom = require("scroll-to-bottomjs");

describe('Integration test with visual testing - configurator Sonderformen - Sechsecke', function () {

    it('load configurator Sonderformen - Sechsecke with Perlissimo-5125', function () {

        //load PDP page
        cy.visit('/perlissimo-5125');
        //load js files
        // cy.wait('@configurator-js-files')
        cy.get('.price_amount > .product_prices > .price .final_price').should('not.contain', '-5,00').and('not.contain', '-2,50')



        //scroll to bottom with npm package to be sure that alls ressources are loaded
        cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }));


        //check if main image is visible
        cy.get('#image').should('be.visible')


        //check if all gallery pictures are visible yet
        cy.get('.small_gallery > ul li')
            .should('have.length', 11)
            .each(($li) => { // iterate through each 'li'
                cy.wrap($li).children().each(($img) => { // iterate through each child of li --> img
                    cy.wrap($img).should('be.visible')
                })
            })

        // check if FreshChat icon is loaded
        cy.checkFreshChat()

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()
        cy.argosScreenshot('Startseite Sonderformen Perlissimo-5125', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });


        //*********************************************************************************
        //*********************************************************************************
        //************ capture all 'Eigenschaften' of the loaded plissee-cloth ************

        //Stoffeinegnschaften
        var attributes = [
            "\"Blickdicht & Lichtdurchlässig\"",
            "\"Perlex Beschichtung\"",
            "\"Geeignet für Feuchträume\"",
            "\"1-2 Tage Maßanfertigung\"",
            "\"Hergestellt in Deutschland\""
        ]

        for (var i = 0; i < attributes.length; i++) {
            cy.get('img[title=' + attributes[i] + ']').trigger('mouseover')
            cy.argosScreenshot('Eigenschaft Perlissimo-5125 - ' + attributes[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });
        }

        //*********************************************************************************
        //*********************************************************************************
        //----------------check form Sechsecke with all available products----------------\\

        cy.get('#hexagon').click({ force: true })
        cy.argosScreenshot('Fensterform - Sechsecke', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        // select VS6        
        cy.get('#vs6').click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
        cy.get('#vs6').siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Sonderformen Sechsecke - Auswahl und Infobox VS6', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        // select VSSD
        cy.get('#vs6sd').click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
        cy.get('#vs6sd').siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Sonderformen Sechsecke - Auswahl und Infobox VS6SD', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()


        // *********************************** BEFESTIGUNGEN - AUSWAHL & INFOBOXES ***********************************

        cy.get('h3').contains('Befestigungstyp').click()  //the only way to make the last VS6d-popup disappear

        //Befestigungen
        var befestigungen = [
            "#direkt_vor_der_scheibe",
            "#klemmtraeger",
            "#am_fensterfluegel"
        ]

        //select available befestigungen and make snapshots
        for (var i = 0; i < befestigungen.length; i++) {

            cy.get('input' + befestigungen[i]).check({ force: true })
            cy.argosScreenshot('Sonderformen Sechsecke Befestigung - ' + befestigungen[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });
            //capture info popup
            cy.get(befestigungen[i]).siblings('.tooltip_icon').realHover()
            cy.get(befestigungen[i]).siblings('.option_item_tooltip').children('img').should('be.visible')
            cy.argosScreenshot('Sonderformen Sechsecke Befestigung- Infobox ' + befestigungen[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });

            cy.clearPopup()
        }


        //*********************************** SCHIENENFARBEN - AUSWAHL & INFOBOXES ***********************************

        //Schienenfarben
        var schienenfarben = [
            "#weiss",
            "#schwarzbraun",
            "#silber",
            "#bronze",
            "#anthrazit"
        ]

        // select available schienenfarben and make snapshots
        for (var i = 0; i < schienenfarben.length; i++) {
            cy.get(schienenfarben[i]).click({ force: true }).wait(500)  //without this wait(500) does not disappear the last popup
            cy.argosScreenshot('Sonderformen Sechsecke - Schienenfarbe ' + schienenfarben[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });
            //capture info popup
            cy.get(schienenfarben[i]).siblings('.tooltip_icon').realHover()
            cy.get(schienenfarben[i]).siblings('.option_item_tooltip').children('img').should('be.visible')
            cy.argosScreenshot('Sonderformen Sechsecke - Infobox Schienenfarbe ' + schienenfarben[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });

            cy.clearPopup()
        }


        // *********************************** BEDIENGRIFFE - AUSWAHL & INFOBOXES ***********************************

        //Standard preselected
        cy.argosScreenshot('Sonderformen Sechsecke - Bediengriff Standard', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#standard').siblings('.tooltip_icon').realHover()
        cy.get('#standard').siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Sonderformen Sechsecke - Infobox Bediengriffe Standard', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        //select Design
        cy.get('#design').check({ force: true })
        cy.argosScreenshot('Sonderformen Sechsecke - Bediengriff Design', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#design').siblings('.tooltip_icon').realHover()
        cy.get('#design').siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Sonderformen Sechsecke - Infobox Bediengriffe Design', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        // workaorund in order to close the last tooltip
        cy.clearPopup()

        // *********************************** BEDIENSTAB-SELECT-FELD & INFOBOX ***********************************

        cy.get('#bedienstab_select').openSelect() //custom command in commands.js
        cy.argosScreenshot('Sonderformen Sechsecke - Bedienstäbe', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        cy.get('#bedienstab_select').closeSelect();   //custom command in commands.js
        //capture info popup
        cy.contains('Optionaler Bedienstab für besonders hohe Fenster').siblings('.tooltip_icon').realHover()
        cy.contains('Optionaler Bedienstab für besonders hohe Fenster').siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Sonderformen Sechsecke - Infobox Bedienstab', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

    })
})
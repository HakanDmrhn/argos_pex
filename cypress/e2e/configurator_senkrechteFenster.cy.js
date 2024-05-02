let scrollToBottom = require("scroll-to-bottomjs");

describe('Integration test with visual testing - configurator Senkrechte Fenster', function () {

    it('load configurator Senkrechte Fenster with Liviano-4313', function () {

        //load PDP page
        cy.visit('/liviano-4313');
        //load js files
        // cy.wait('@configurator-js-files')
        cy.get('.price_amount > .product_prices > .price .final_price').should('not.contain', '-5,00')


        //scroll to bottom with npm package to be sure that alls ressources are loaded
        cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }));


        //check if main image is visible
        cy.get('#image').should('be.visible')


        //check if all gallery pictures are visible yet
        cy.get('.small_gallery > ul li')
            .should('have.length', 8)
            .each(($li) => { // iterate through each 'li'
                cy.wrap($li).children().each(($img) => { // iterate through each child of li --> img
                    cy.wrap($img).should('be.visible')
                })
            })

        // check if FreshChat icon is loaded
        cy.checkFreshChat()

        // Senkrechte Fenster preselected
        cy.argosScreenshot('Startseite: Senkrechte Fenster mit Liviano 4313', {
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
            "\"Transparent\"",
            "\"identische Vorder- und Rückseite\"",
            "\"Wasser und Schmutzabweisend\"",
            "\"Öko-Tex Standard 100 zertifiziert (schadstoffgeprüft)\"",
            "\"Geeignet für Feuchträume\"",
            "\"1-2 Tage Maßanfertigung\"",
            "\"Hergestellt in Deutschland\""
        ]

        for (var i = 0; i < attributes.length; i++) {
            cy.get('img[title=' + attributes[i] + ']').trigger('mouseover')
            cy.argosScreenshot('Eigenschaft Liviano-4313: ' + attributes[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6
                    { width: 1280, height: 1024 }, // Specify dimensions directly
                ]
            });
        }


        //------------------------------------------ Plissee-TYPEN VS1,VS2 & INFOBOXES -------------------------------------------\\
        //****************************************************************************************************************\\

        //VS2 preselected - select vs1
        cy.get('#vs1').click({ force: true })
        cy.argosScreenshot('VS1 selected', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#vs1').siblings('.tooltip_icon').realHover()
        cy.get('#vs1').siblings('.option_item_tooltip').children('div').children('img').should('be.visible')
        cy.argosScreenshot('Infobox - Senkrechte Fenster: VS1', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        //select vs2  
        cy.get('#vs2').click({ force: true })
        cy.argosScreenshot('VS2 selected', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#vs2').siblings('.tooltip_icon').realHover()
        cy.get('#vs2').siblings('.option_item_tooltip').children('div').children('img').should('be.visible')
        cy.argosScreenshot('Infobox - Senkrechte Fenster: VS2', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        // // *********************************** BEFESTIGUNGEN - AUSWAHL & INFOBOXES ***********************************

        //Befestigungen
        var befestigungen = [
            "#direkt_vor_der_scheibe",
            "#gelenkklebeplatten",
            "#stick_fix",
            "#stick_fix_front",
            "#klemmtraeger",
            "#klebeleisten",
            "#am_fensterfluegel",
            "#falzfix",
            "#glasleistenwinkel",
            "#klemmtraeger_slim"
        ]

        //select available befestigungen and make snapshots
        for (var i = 0; i < befestigungen.length; i++) {

            // cy.get(befestigungen[i]).click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
            // cy.argosScreenshot('Sonderformen Dreiecke - Auswahl und Infobox: ' + befestigungen[i])

            cy.get('input' + befestigungen[i]).check({ force: true })
            cy.argosScreenshot('Senkrechte Fenster Befestigung: ' + befestigungen[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6
                    { width: 1280, height: 1024 }, // Specify dimensions directly
                ]
            });
            //capture info popup
            cy.get(befestigungen[i]).siblings('.tooltip_icon').realHover()
            cy.get(befestigungen[i]).siblings('.option_item_tooltip').children('img').should('be.visible')
            cy.argosScreenshot('Senkrechte Fenster Befestigung- Infobox: ' + befestigungen[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6
                    { width: 1280, height: 1024 }, // Specify dimensions directly
                ]
            });

            cy.clearPopup()
        }


        // *********************************** SCHIENENFARBEN - AUSWAHL & INFOBOXES ***********************************

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
            cy.get(schienenfarben[i]).click({ force: true }).wait(500)  //without this wait(500) does not disappear the last popup of SD3
            cy.argosScreenshot('Senkrechte Fenster: Schienenfarbe ' + schienenfarben[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6
                    { width: 1280, height: 1024 }, // Specify dimensions directly
                ]
            });
            //capture info popup
            cy.get(schienenfarben[i]).siblings('.tooltip_icon').realHover()
            cy.get(schienenfarben[i]).siblings('.option_item_tooltip').children('img').should('be.visible')
            cy.argosScreenshot('Senkrechte Fenster - Infobox: Schienenfarbe ' + schienenfarben[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6
                    { width: 1280, height: 1024 }, // Specify dimensions directly
                ]
            });

            cy.clearPopup()
        }


        // *********************************** BEDIENGRIFFE - AUSWAHL & INFOBOXES ***********************************

        cy.clearPopup()

        //Standard preselected
        cy.argosScreenshot('Senkrechte Fenster: Bediengriff Standard', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#standard').siblings('.tooltip_icon').realHover()
        cy.get('#standard').siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Senkrechte Fenster - Infobox: Bediengriffe Standard', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        //select Design
        cy.get('#design').check({ force: true })
        cy.argosScreenshot('Senkrechte Fenster: Bediengriff Design', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#design').siblings('.tooltip_icon').realHover()
        cy.get('#design').siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Senkrechte Fenster - Infobox: Bediengriffe Design', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        // workaorund in order to close the last tooltip
        cy.contains('Mehr erfahren').realHover().wait(500)

        // *********************************** BEDIENSTAB-SELECT-FELD & INFOBOX ***********************************

        cy.get('#bedienstab_select').openSelect() //custom command in commands.js
        cy.argosScreenshot('Senkrechte Fenster: Bedienstäbe', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        cy.get('#bedienstab_select').closeSelect();   //custom command in commands.js

        //capture info popup
        cy.contains('Optionaler Bedienstab für besonders hohe Fenster').siblings('.tooltip_icon').realHover()
        cy.contains('Optionaler Bedienstab für besonders hohe Fenster').siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Senkrechte Fenster - Infobox: Bedienstab', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
    });
})
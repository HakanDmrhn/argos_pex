let scrollToBottom = require("scroll-to-bottomjs");

describe('Integration test with visual testing - configurator Sonderformen - Plafond', function () {

    it('load configurator Sonderformen - Plafond with Perlissimo-4515', function () {

        //load PDP page
        cy.visit('/perlissimo-4515');
        //load js files
        // cy.wait('@configurator-js-files')
        cy.get('.price_amount > .product_prices > .price .final_price').should('not.contain', '-5,00').and('not.contain', '-2,50')


        //scroll to bottom with npm package to be sure that alls ressources are loaded
        cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }));


        //check if main image is visible
        cy.get('#image').should('be.visible')


        //check if all gallery pictures are visible yet
        cy.get('.small_gallery > ul li')
            .should('have.length', 12)
            .each(($li) => { // iterate through each 'li'
                cy.wrap($li).children().each(($img) => { // iterate through each child of li --> img
                    cy.wrap($img).should('be.visible')
                })
            })

        // check if FreshChat icon is loaded
        cy.checkFreshChat()

        //Auswahl Tab Sonderformen
        cy.contains('Sonderformen').click()
        cy.argosScreenshot('Startseite Sonderformen Perlissimo-4515', {
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
            "\"Geeignet für Bildschirmarbeitsplätze\"",
            "\"Öko-Tex Standard 100 zertifiziert (schadstoffgeprüft)\"",
            "\"Geeignet für Feuchträume\"",
            "\"1-2 Tage Maßanfertigung\"",
            "\"Hergestellt in Deutschland\""
        ]

        for (var i = 0; i < attributes.length; i++) {
            cy.get('img[title=' + attributes[i] + ']').trigger('mouseover')
            cy.argosScreenshot('Eigenschaft Perlissimo-4515: ' + attributes[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });
        }


        //*********************************************************************************
        //*********************************************************************************
        //----------------check form Plafond with all available products----------------\\


        cy.get('#plafond').click({ force: true })
        cy.argosScreenshot('Fensterform: Plafond', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        //Plisseetypen erhältlich
        var available_types = [
            "#pl11",
            "#pl40",
            "#plk13"
        ]

        //select plissee types and make snapshot
        for (var i = 0; i < available_types.length; i++) {
            cy.get(available_types[i]).click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
            cy.get(available_types[i]).siblings('.option_item_tooltip').children('img').should('be.visible')
            cy.argosScreenshot('Sonderformen Plafond - Auswahl und Infobox ' + available_types[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });

            cy.clearPopup()
        }

        //Plisseetypen nicht erhältlich
        var non_available_types = [
            "#pl30",
            "#pl31",
            "#pl32",
            "#pl33",
            "#pl41",
            "#pl42",
            "#ple12",
            "#sdp2",
            "#sdp3"
        ]

        //select plissee types and make snapshot
        for (var i = 0; i < non_available_types.length; i++) {
            cy.get(non_available_types[i]).click({ force: true }).wait(500)  //interception '@prices' or workaround cy.clearPopup() do not work
            cy.argosScreenshot('Sonderformen Plafond - Auswahl: ' + non_available_types[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });
        }


        // *********************************** BEFESTIGUNGEN - AUSWAHL & INFOBOXES ***********************************

        // select plk13 to make all befestigungen visible
        cy.get('#plk13').click({ force: true }).wait(500)

        cy.clearPopup()
        cy.get('h3').contains('Befestigungstyp').click()  //the only way to make the last plk13-popup disappear

        //Befestigungen
        var befestigungen = [
            "#clip",
            "#winkel",
            "#montageprofil_mit_winkeln",
            "#montageprofil_haltebolzen"
        ]

        //select available befestigungen and make snapshots
        for (var i = 0; i < befestigungen.length; i++) {

            cy.get('input' + befestigungen[i]).check({ force: true })
            cy.argosScreenshot('Sonderformen Plafond Befestigung - ' + befestigungen[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });
            //capture info popup
            cy.get(befestigungen[i]).siblings('.tooltip_icon').realHover()
            cy.get(befestigungen[i]).siblings('.option_item_tooltip').children('img').should('be.visible')
            cy.argosScreenshot('Sonderformen Plafond Befestigung- Infobox ' + befestigungen[i], {
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
            cy.get(schienenfarben[i]).click({ force: true }).wait(500)  //without this wait(500) does not disappear the last popup of SD3
            cy.argosScreenshot('Sonderformen Plafond - Schienenfarbe ' + schienenfarben[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });
            //capture info popup
            cy.get(schienenfarben[i]).siblings('.tooltip_icon').realHover()
            cy.get(schienenfarben[i]).siblings('.option_item_tooltip').children('img').should('be.visible')
            cy.argosScreenshot('Sonderformen Plafond - Infobox Schienenfarbe ' + schienenfarben[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6 --> 375x667
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                ]
            });

            cy.clearPopup()
        }


        //*********************************** BEDIENSEITE UND PENDELSICHERUNG ***********************************

        //select Bedienseite rechts
        cy.get('#rechts').check({ force: true }).wait(500)
        cy.argosScreenshot('Sonderformen Plafond - Bedienseite rechts', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        //select Bedienseite mitte
        cy.get('#mitte').check({ force: true })
        cy.argosScreenshot('Sonderformen Plafond - Bedienseite mitte', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        //select Bedienseite links
        cy.get('#links').check({ force: true })
        cy.argosScreenshot('Sonderformen Plafond - Bedienseite links', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        //capture info popup Bedienseite
        cy.contains(new RegExp("^" + 'Bedienseite' + "\\s*$")).next('.tooltip_icon').realHover()
        cy.contains(new RegExp("^" + 'Bedienseite' + "\\s*$")).siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Sonderformen Plafond - Infobox Bedienseite', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        // *********************************** KURBEL - AUSWAHL & INFOBOXES ***********************************

        //select HANDKURBEL 
        cy.get('#kurbel').check({ force: true })
        cy.argosScreenshot('Sonderformen Plafond - Bedienung Kurbel', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#kurbel').siblings('.tooltip_icon').realHover()
        cy.get('#kurbel').siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Sonderformen Plafond - Infobox Bedienung Kurbel', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        // SELECT HANDKURBEL
        cy.get('#handkurbel_select').openSelect() //custom command in commands.js
        cy.argosScreenshot('Sonderformen Plafond - Handkurbel', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        cy.get('#handkurbel_select').closeSelect();   //custom command in commands.js

        //------------------------------------------------------------------------------------------------------ 

        //select Elektrostab
        cy.get('#elektrostab').check({ force: true })
        cy.argosScreenshot('Sonderformen Plafond - Bedienung Elektrostab', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#elektrostab').siblings('.tooltip_icon').realHover()
        cy.get('#elektrostab').siblings('.option_item_tooltip').children('img').should('be.visible')
        cy.argosScreenshot('Sonderformen Plafond - Infobox Bedienung Elektrostab', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        // SELECT Elektrostab
        cy.get('#elektrostab_select').openSelect() //custom command in commands.js
        cy.argosScreenshot('Sonderformen Plafond - Elektrostab', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        cy.get('#elektrostab_select').closeSelect();   //custom command in commands.js
    })
})
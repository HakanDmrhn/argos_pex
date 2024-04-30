// import "cypress-real-events/support";
let scrollToBottom = require("scroll-to-bottomjs");

describe('Integration test with visual testing - configurator Dachfenster', function () {

    it('load configurator Dachfenster with Wabe Ultima-4804', function () {

        //load PDP page
        cy.visit('/wabe-ultima-4804');
        //load js files
        cy.wait('@configurator-js-files')
        //scroll to bottom with npm package to be sure that alls ressources are loaded
        cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }));
        //check if main image is visible
        cy.get('#image').should('be.visible')
        //check if all gallery pictures are visible yet
        cy.get('.small_gallery > ul li')
            .should('have.length', 13)
            .each(($li) => { // iterate through each 'li'
                cy.wrap($li).children().each(($img) => { // iterate through each child of li --> img
                    cy.wrap($img).should('be.visible')
                })
            })
        // check if FreshChat icon is loaded
        cy.checkFreshChat()

        //Auswahl Tab Dachfenster
        cy.contains('Dachfenster').click()
        cy.argosScreenshot('Startseite: Dachfenster mit Wabe Ultima 4804', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        //----------------------------------------------------------------------------------------------\\
        //---------------------------------- GENORMTE DF ------------------------------------------------\\
        //------------------------------------------------------------------------------------------------\\

        //--------------------------------- STOFF-EIGENSCHAFTEN-----------------------------------------\\
        //***********************************************************************************************\\
        //capture all 'Eigenschaften' of the loaded plissee-cloth /wabe-ultima-4804

        //Stoffeinegnschaften
        var attributes = [
            "\"Abdunkelnd\"",
            "\"Wabenplissee\"",
            "\"Geeignet für Bildschirmarbeitsplätze\"",
            "\"Schallreduzierend\"",
            "\"Plissee mit weißer Rückseite\"",
            "\"Öko-Tex Standard 100 zertifiziert (schadstoffgeprüft)\"",
            "\"Geeignet für Feuchträume\"",
            "\"1-2 Tage Maßanfertigung\"",
            "\"Hergestellt in Deutschland\""
        ]

        for (var i = 0; i < attributes.length; i++) {
            cy.get('img[title=' + attributes[i] + ']').trigger('mouseover')
            cy.argosScreenshot('Eigenschaft Wabe Ultima-4804: ' + attributes[i], {
                viewports: [
                    "iphone-6", // Use device preset for iphone-6
                    { width: 1280, height: 1024 }, // Specify dimensions directly
                ]
            });
        }

        //------------------------------------------ DF-TYPEN-------------------------------------------\\
        //***********************************************************************************************\\

        //select DF20
        cy.get('input#df20').check({ force: true })
        cy.argosScreenshot('Auswahl - Dachfenster: DF20', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#df20').siblings('.tooltip_icon').realHover()
        cy.argosScreenshot('Infobox - Dachfenster: DF20', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        //select DF20C
        cy.get('input#df20c').check({ force: true })
        cy.argosScreenshot('Auswahl - Dachfenster: DF20 Comfort', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#df20c').siblings('.tooltip_icon').realHover()
        cy.argosScreenshot('Infobox - Dachfenster: DF20 Comfort', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        //select DF30C
        cy.get('input#df30c').check({ force: true })
        cy.argosScreenshot('Auswahl - Dachfenster: DF30 Comfort', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        //capture info popup
        cy.get('#df30c').siblings('.tooltip_icon').realHover()
        cy.argosScreenshot('Infobox - Dachfenster: DF30 Comfort', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        // --> last selected type is DF 30C

        cy.clearPopup()

        //----------------------------------- SELECT-FELDER --------------------------------------------\\
        //***********************************************************************************************\\
        // Hersteller
        cy.get('#df_hersteller_select').openSelect() //custom command in commands.js
        cy.argosScreenshot('Genormte Dachfenster: Hersteller', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        cy.get('#df_hersteller_select').closeSelect();   //custom command in commands.js
        // Bedienstäbe
        cy.get('#bedienstab_select').openSelect();   //custom command in commands.js
        cy.argosScreenshot('Genormte Dachfenster: Bedienstäbe', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        cy.get('#bedienstab_select').closeSelect();   //custom command in commands.js
        // untere Stoffe
        cy.get('#unterer_stoff_gruppe_select').openSelect();   //custom command in commands.js
        cy.argosScreenshot('Genormte Dachfenster: Untere Stoffe', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
        cy.get('#unterer_stoff_gruppe_select').closeSelect();   //custom command in commands.js


        //------------------------- BEDIENGRIFFE, SCHIENENFARBEN UND BEDIENSTAB-------------------------\\
        //***********************************************************************************************\\
        //select DF20 to make Bediengriff visible
        cy.get('input#df20').check({ force: true })

        //wait for DF20  prices before next snapshot since cypress is too fast at this point
        cy.get('.original_price').should('contain', '151,00') // 146 + 5
        cy.get('.final_price').should('contain', '114,50')  // R 5,18 151,00 -5,00 -25% +5,00= 114,50

        //capture infoboxes of Bediengriff Standard and Design
        // --> Standard
        cy.get('#standard').siblings('.tooltip_icon').realHover()
        cy.argosScreenshot('Infobox - Dachfenster: Bediengriff Standard', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        // --> Design
        cy.get('#design').siblings('.tooltip_icon').realHover()
        cy.argosScreenshot('Infobox - Dachfenster: Bediengriff Design', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        //select DF20 C to make Schienenfarbe weiß and grau visible
        cy.get('input#df20c').check({ force: true })

        //wait for DF20 C prices before next snapshot since cypress is too fast at this point
        cy.get('.original_price').should('contain', '179,00')
        cy.get('.final_price').should('contain', '135,50') // R 5,18 179,00 -5,00 -25% +5,00= 114,50

        //capture infoboxes Schienenfarbe weiß and grau
        // --> weiß
        cy.get('#weiss').siblings('.tooltip_icon').realHover()
        cy.argosScreenshot('Infobox - Dachfenster: Schienenfarbe weiß', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        // --> grau
        cy.get('#grau').siblings('.tooltip_icon').realHover()
        cy.argosScreenshot('Infobox - Dachfenster: Schienenfarbe grau', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        //capture bedienstab
        cy.contains('Optionaler Bedienstab für besonders hohe Fenster').siblings('.tooltip_icon').realHover()
        cy.argosScreenshot('Infobox - Dachfenster: Bedienstab', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        cy.clearPopup()

        //----------------------------------------------------------------------------------------------\\
        //---------------------------------- UNGENORMTE DF ----------------------------------------------\\
        //-------------------------------------FALZARTEN--------------------------------------------------\\

        //switch to ungenormt
        cy.contains('Ungenormte Fenster').click().wait(500)
        cy.argosScreenshot('Ungenormte Fenster - gerader Falz', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        // cy.get('#schraegerfalzSchräger Falz').check() // cypress doesn't like spaces in ids
        cy.get('[id="schraeger_falz"]').check({ force: true })
        cy.argosScreenshot('Ungenormte Fenster - schräger Falz', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        // cy.get('#Schräger Falz mit Schattenfuge').check() // cypress doesn't like spaces in ids
        cy.get('[id="falz_mit_schattenfuge"]').check({ force: true })
        cy.argosScreenshot('Ungenormte Fenster - schräger Falz mit Schattenfuge', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });

        // cy.get('#Schräger Falz mit Aufsatz vor Glas').check() // cypress doesn't like spaces in ids
        cy.get('[id="falz_mit_aufsatz_vor_glas"]').check({ force: true })
        cy.argosScreenshot('Ungenormte Fenster - schräger Falz mit Aufsatz vor Glas', {
            viewports: [
                "iphone-6", // Use device preset for iphone-6
                { width: 1280, height: 1024 }, // Specify dimensions directly
            ]
        });
    })
})

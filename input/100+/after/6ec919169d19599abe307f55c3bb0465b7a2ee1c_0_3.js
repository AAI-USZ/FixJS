function() {
        this.control({
            "#boutonAjouterContenu": {
                click: this.ajouterContenu
            },
            "#boutonOuvrirFenetreTC": {
                click: this.ouvrirFenetreTC
            },
            "#boutonAjouterChampTC": {
                click: this.creerChampTC
            },
            "#champsEditionTC ChampTC": {
                afterrender: this.selectChampTC,
                beforedestroy: this.enleveChampTC
            },
            "#ChampTCSelectGrid": {
                itemclick: this.updateOptionsListeTC
            },
            "#AdminfTypesGridView": {
                itemclick: this.majAdminfTypesCentenus
            },
            "#boutonSupprimerTypeContenu": {
                click: this.supprimeTypeContenu
            },
            "#boutonEnregistrerTypeContenu": {
                click: this.enregistrerTypeContenus
            },
            "#boutonNouveauTypeContenu": {
                click: this.fenetreNTC
            },
            "#boutonCreerTC": {
                click: this.creerNTC
            },
            "[itemId= 'boutonReplicateurChamps']": {
                click: this.repliqueChamp
            }
        });

    }
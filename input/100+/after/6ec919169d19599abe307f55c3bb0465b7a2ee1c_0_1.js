function(button, e, options) {
        if (Ext.isDefined(Ext.getCmp('TypesContenusGrid').getSelectionModel().getSelection()[0])) {
            var fenetre = Ext.widget('ajouterContenu');
            fenetre.showAt(screen.width/2-300, 100);
            var formulaireTC = Ext.getCmp('boiteAChampsContenus');
            var champsD =Ext.getCmp('TypesContenusGrid').getSelectionModel().getSelection()[0].data.champs;
            for (g=0; g<champsD.length; g++) {
                var donnees=champsD[g];
                var configurateur = Ext.clone(donnees.config);
                if (donnees.cType =='treepicker'){ 
                    var monStore= Ext.getStore(donnees.store);
                    configurateur.store = monStore;
                    monStore.load();
                }
                else if (donnees.cType == 'combobox') {
                    var monStore=  Ext.create('Ext.data.Store', Ext.clone(donnees.store));
                    configurateur.store = monStore;
                }
                var nouvChamp = Ext.widget(donnees.cType, configurateur);
                nouvChamp.config=Ext.clone(donnees.config);
                if (donnees.cType =='triggerfield'){ 
                    var Ouvrir = Ext.clone(donnees.ouvrir);
                    nouvChamp.onTriggerClick= function() {
                        var fenetre = Ext.widget(Ouvrir);
                        fenetre.showAt(screen.width/2-200, 100);
                    } ; 
                    nouvChamp.ouvrir =Ext.clone(donnees.ouvrir);
                }  
                nouvChamp.anchor = '90%';
                nouvChamp.style = '{float:left;}';
                var enrobage =Ext.widget('ChampTC');
                enrobage.add(nouvChamp);
                enrobage.getComponent('helpBouton').setTooltip(nouvChamp.config.tooltip);
                enrobage.getComponent(2).destroy();
                enrobage.getComponent(1).destroy();
                enrobage.getComponent(0).destroy();
                if (nouvChamp.multivalué) {
                    enrobage.add(Ext.widget('button', {iconCls: 'add',valeursM: 1, margin: '0 0 0 5', tooltip: 'Valeurs multiples', itemId: 'boutonReplicateurChamps'}));

                };
                formulaireTC.add(enrobage);

            }
            var formTaxoTC =  Ext.getCmp('boiteATaxoContenus');
            var lesTaxo = Ext.getCmp('TypesContenusGrid').getSelectionModel().getSelection()[0].data.vocabulaires;
            var i=0;
            for (i=0; i<lesTaxo.length; i++) {
                var leVocab = Ext.getStore('TaxonomieDataJson').findRecord('titre', lesTaxo[i].titre);
                var vocabAPlat= [ ];
                this.miseAPlatTaxo(leVocab.data.termes.children, vocabAPlat);

                var storeT = Ext.create('Ext.data.Store', {
                    fields: ['terme'],
                    data : vocabAPlat
                });


                var selecteur = Ext.widget('comboboxselect', {
                    width:690,
                    fieldLabel: leVocab.data.titre,
                    autoScroll: false,
                    store: storeT,
                    queryMode: 'local',
                    displayField: 'terme',
                    valueField: 'terme',
                    filterPickList: true,
                    typeAhead: true,
                    forceSelection: !leVocab.data.etiquettes,
                    createNewOnEnter: leVocab.data.etiquettes,
                    multiSelect: leVocab.data.choixMultiple,
                    allowBlank: !leVocab.data.obligatoire
                });
                var enrobage =Ext.widget('ChampTC');
                enrobage.add(selecteur);
                enrobage.getComponent('helpBouton').setTooltip(leVocab.data.helpText);
                enrobage.getComponent(2).destroy();
                enrobage.getComponent(1).destroy();
                enrobage.getComponent(0).destroy();
                formTaxoTC.add(enrobage);

            }





        }
    }
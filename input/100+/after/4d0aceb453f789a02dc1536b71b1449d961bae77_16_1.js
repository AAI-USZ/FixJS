function () {
        this.control({
            'prescription [action=addPatient]': {
                click: this.displayForm
            },
            "addPatient button[action=submit]": {
                click: this.savePerson
            },
            "prescription": {
                // as the perscription view activates it attaches listners to the 3 fields and 2
                // girds of advanced search
                activate: function(){
                    // below there listners call searchPatient() as enter key is pressed 
                    Ext.getCmp('patientNameASearch').on('specialkey', function(field, e){
                        if (e.getKey() == KEY.ENTER) {
                            this.searchPatient()
                        }
                    },this)
                    Ext.getCmp('prescriptionIdASearch').on('specialkey', function(field, e){
                        if (e.getKey() == KEY.ENTER) {
                            this.searchPatient()
                        }
                    },this)
                    Ext.getCmp('prescriptionDateASearch').on('specialkey', function(field, e){
                        if (e.getKey() == KEY.ENTER) {
                            this.searchPatient()
                        }
                    },this)
                    // listner on patient search results to show drugorders when a patient is selected
                    Ext.getCmp('patientASearchGrid').on('cellClick', function(){
                      this.patientSelect(Ext.getCmp('patientASearchGrid').getSelectionModel().getSelection()[0].getData())
                    },this)
                    // listner on perscription grid to show drugorder on main grid with more details
                    Ext.getCmp('drugOrderASearchGrid').on('cellClick', function(){
                      this.DrugOrderSelect(Ext.getCmp('drugOrderASearchGrid').getSelectionModel().getSelection()[0])
                    },this)
                }
            },
            // show patient search results when pressed
            'prescription button[action=back]': {
                click: this.goback
            }
        })
    }
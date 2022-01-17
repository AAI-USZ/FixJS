function () {
        var active = Ext.getCmp('viewPort').getActiveItem();
        
        if(active.id=='ext-panel-5' || active.id=='ext-familyDetails-1' || active.id=='ext-panel-3' || active.id=='ext-tabpanel-2'){
            this.doList('familyList');
            Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
        }else if(active.id == 'ext-AddPatient-1' || active.id=='ext-patientDetails-1'){
            //go back to family details
            helper.listDisclose('family', savedFamilyRecord)
        }else if(active.id=='inventoryDetails'){
            //go back to inventory list
            this.doToolbar('inventory')
        }else if(active.id=='ext-resourceDetail-1'){
            this.doToolbar('resources')
        }else{
            console.log(active.id);
        }
    }
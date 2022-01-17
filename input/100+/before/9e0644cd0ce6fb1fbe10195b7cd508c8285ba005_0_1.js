function (arg) {
        var title = Ext.getCmp('titletext');
        var button = Ext.getCmp('backButton');
        console.log(title,button)
        if (arg === PAGES.LOGIN_SCREEN) {
            title.setTitle('Community Health Worker Module');
            button.setHidden(false)
        } else if (arg === PAGES.PATIENT_LIST) {
            title.setTitle('Patient List');
            button.setHidden(true);
        } else if (arg === PAGES.PATIENT_DET) {
            // title.setTitle('Patient Details');
            button.setHidden(false)
        } else if (arg === PAGES.ADD) {
            title.setTitle('Add Options');
            button.setHidden(false)
        }
        else if (arg === PAGES.ADD_REG) {
            title.setTitle('Add Patient');
            button.setHidden(false)
        }
        else if (arg === PAGES.ADD_REM) {
            title.setTitle('Add Reminder');
            button.setHidden(false)
        }
        else if (arg === PAGES.ADD_APP) {
            title.setTitle('Add Appointment');
            button.setHidden(false)
        }
        else if (arg === PAGES.INBOX_CHW) {
            title.setTitle('Inbox');
            button.setHidden(false)
        }
        else if (arg === PAGES.RESOURCES) {
            title.setTitle('Resources');
            button.setHidden(false)
        }
        else if (arg === PAGES.RESOURCE_DET) {
            // title.setTitle('Patient Details');
            button.setHidden(false)
        }
        else if (arg === PAGES.INBOX_VC) {
            title.setTitle('Inbox');
            button.setHidden(true)
        }
        else if (arg === PAGES.SCHEDULING) {
            title.setTitle('Scheduling');
            button.setHidden(true)
        }
        Ext.getCmp('viewPort').setActiveItem(arg);
    }
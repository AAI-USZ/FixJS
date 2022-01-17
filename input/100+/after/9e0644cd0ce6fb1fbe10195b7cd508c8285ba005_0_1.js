function (arg) {
        var t = Ext.getCmp('narwhal');
        var b = Ext.getCmp('backButton');
        // console.log(title,button)
        if (arg === PAGES.LOGIN_SCREEN) {
            t.setTitle('Community Health Worker Module');
            b.setHidden(false)
        } else if (arg === PAGES.PATIENT_LIST) {
            t.setTitle('Patient List');
            b.setHidden(true);
        } else if (arg === PAGES.PATIENT_DET) {
            // title.setTitle('Patient Details');
            b.setHidden(false)
        } else if (arg === PAGES.ADD) {
            t.setTitle('Add Options');
            b.setHidden(false)
        }
        else if (arg === PAGES.ADD_REG) {
            t.setTitle('Add Patient');
            b.setHidden(false)
        }
        else if (arg === PAGES.ADD_REM) {
            t.setTitle('Add Reminder');
            b.setHidden(false)
        }
        else if (arg === PAGES.ADD_APP) {
            t.setTitle('Add Appointment');
            b.setHidden(false)
        }
        else if (arg === PAGES.INBOX_CHW) {
            t.setTitle('Inbox');
            b.setHidden(false)
        }
        else if (arg === PAGES.RESOURCES) {
            t.setTitle('Resources');
            b.setHidden(false)
        }
        else if (arg === PAGES.RESOURCE_DET) {
            // title.setTitle('Patient Details');
            b.setHidden(false)
        }
        else if (arg === PAGES.INBOX_VC) {
            t.setTitle('Inbox');
            b.setHidden(true)
        }
        else if (arg === PAGES.SCHEDULING) {
            t.setTitle('Scheduling');
            b.setHidden(true)
        }
        Ext.getCmp('viewPort').setActiveItem(arg);
    }
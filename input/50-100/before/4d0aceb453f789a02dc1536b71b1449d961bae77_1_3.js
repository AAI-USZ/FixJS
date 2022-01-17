function () {
        // clear form fields
        Ext.getCmp('username').reset();
        Ext.getCmp('password').reset();
        if (USER.type === 'CHW') {
            // continue to next page with proper settings
            // Ext.getCmp('welcome_label').setHtml("Welcome, "+USER.name+"<br>"+"This is your check in for "+CURR_DATE)
            this.doDownload();
            Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
        } else if (USER.type === 'VC') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.INBOX_VC)
        }
    }
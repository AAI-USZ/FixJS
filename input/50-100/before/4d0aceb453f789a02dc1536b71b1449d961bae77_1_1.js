function (arg) {
        if (arg === 'video') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.VIDEO)
        } else if (arg === 'audio') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.AUDIO)
        } else if (arg === 'photo') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.PHOTO)
        }
    }
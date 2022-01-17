function() {
        Ext.widget('chooseexaminerswindow', {
            title: gettext('Set examiners'),
            itemId: 'setExaminersWindow',
            panelConfig: {
                includeRemove: true,
                sourceStore: this.manageStudentsController.getRelatedExaminersRoStore()
            }
        }).show();
    }
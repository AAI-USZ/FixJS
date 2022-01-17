function() {
        Ext.widget('chooseexaminerswindow', {
            title: gettext('Set examiners'),
            itemId: 'setExaminersWindow',
            sourceStore: this.manageStudentsController.getRelatedExaminersRoStore()
        }).show();
    }
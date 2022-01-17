function() {
        // Summary:
        //    Add a tooltip to the logo with the current user and p6 version
        // Description:
        //    Add a tooltip to the logo with the current user and p6 version
        var userList = phpr.userStore.getList();

        // Add a tooltip with the current user
        for (var i = 0; i < userList.length; i++) {
            if (userList[i].id == phpr.currentUserId) {
                var version = (phpr.config.phprojektVersion) ? phpr.config.phprojektVersion : '';
                var support = (phpr.config.supportAddress) ? phpr.config.supportAddress : '';
                var label   = '<div style="text-align: center;">PHProjekt ' + version + ' - ';
                if (support !== '') {
                    label += support + '<br />';
                }
                label += userList[i].display + ' (ID: ' + userList[i].id + ')</div>';
                var node = phpr.viewManager.getView().PHProjektLogo;
                new dijit.Tooltip({
                    label:     label,
                    connectId: [node],
                    showDelay: 50
                });
                break;
            }
        }
    }
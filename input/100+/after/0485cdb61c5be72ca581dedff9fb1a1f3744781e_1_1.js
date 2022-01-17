function (wizard, oldStep, newStep) {
        var userWizard = wizard.up('userWizardPanel');

        userWizard.addStickyNavigation(userWizard);

        if (newStep.getXType() === 'wizardStepProfilePanel') {
            // move to 1st step
            userWizard.setFileUploadDisabled(true);
        }

        if (newStep.getXType() === 'summaryTreePanel') {
            var treePanel = newStep;
            // Can not re-use data object each time the rootnode is set
            // This somewhat confuses the store. Clone for now.
            treePanel.setDiffData(userWizard.getData(),
                userWizard.userFields);
        }

        // oldStep can be null for first page
        if (oldStep && oldStep.getXType() === 'userStoreListPanel') {
            // move from 1st step
            userWizard.setFileUploadDisabled(false);
        }

        // auto-suggest username
        if ((oldStep && oldStep.itemId === 'profilePanel') && newStep.itemId === 'userPanel') {
            var formPanel = wizard.down('editUserFormPanel');
            var firstName = formPanel.down('#firstName');
            var firstNameValue = firstName ? Ext.String.trim(firstName.getValue()) : '';
            var lastName = formPanel.down('#lastName');
            var lastNameValue = lastName ? Ext.String.trim(lastName.getValue()) : '';
            var userStoreName = wizard.getData().userStore;
            var usernameField = wizard.down('#username');
            if (firstNameValue || lastNameValue) {
                this.autoSuggestUsername(firstNameValue, lastNameValue, userStoreName, usernameField);
            }
        }
    }
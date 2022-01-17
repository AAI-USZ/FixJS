function (wizard, oldStep, newStep) {
        var userstoreWizard = wizard.up('userstoreWizardPanel');
        if (newStep.getXType() === 'summaryTreePanel') {
            var treePanel = newStep;
            // Can not re-use data object each time the rootnode is set
            // This somewhat confuses the store. Clone for now.
            treePanel.getStore().setRootNode(Admin.plugin.Diff.compareUserstores(userstoreWizard.getData(),
                userstoreWizard.modelData));
        }
    }
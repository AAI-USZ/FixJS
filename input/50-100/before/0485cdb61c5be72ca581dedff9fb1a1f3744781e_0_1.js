function (wizard, oldStep, newStep) {

        if (newStep.getXType() === 'summaryTreePanel') {
            var groupWizard = wizard.up('groupWizardPanel');
            var treePanel = newStep;

            treePanel.getStore().setRootNode(Admin.plugin.Diff.compareGroups(groupWizard.getData(),
                groupWizard.modelData));
        }
    }
function (wizard, oldStep, newStep) {

        if (newStep.getXType() === 'summaryTreePanel') {
            var groupWizard = wizard.up('groupWizardPanel');
            var treePanel = newStep;

            treePanel.setDiffData(groupWizard.getData(),
                groupWizard.modelData);
        }
    }
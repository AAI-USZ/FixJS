function () {
        var me = this;
        var generalStep = {
            stepTitle: "General",
            modelData: me.modelData,
            xtype: 'userstoreWizardGeneralPanel'
        };
        var configStep = {
            stepTitle: "Config",
            modelData: me.modelData,
            xtype: 'userstoreWizardConfigPanel'
        };
        var adminStep = {
            stepTitle: 'Administrators',
            modelData: me.modelData,
            xtype: 'userstoreWizardAdminPanel'
        };
        var summaryStep = {
            stepTitle: 'Summary',
            modelData: me.modelData,
            dataType: 'userstore',
            xtype: 'summaryTreePanel'
        };

        return [generalStep, configStep, adminStep, summaryStep];
    }
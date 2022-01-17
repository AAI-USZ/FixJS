function () {
        var me = this;
        var isRole = me.modelData !== undefined ? me.modelData.type === 'role' : false;
        var generalStep = {
            stepTitle: "General",
            modelData: this.modelData,
            xtype: 'wizardStepGeneralPanel'
        };
        var membersStep = {
            stepTitle: "Members",
            modelData: this.modelData,
            userStore: this.userstore,
            xtype: 'wizardStepMembersPanel'
        };
        var summaryStep = {
            stepTitle: 'Summary',
            modelData: this.modelData,
            dataType: 'group',
            xtype: 'summaryTreePanel'
        };

        if (isRole) {
            return [membersStep, summaryStep];
        } else {
            return [generalStep, membersStep, summaryStep];
        }

    }
function()
    {
        var me = this;
        var item = this.getSelected();
        if (!item) return;
        if (!confirm("Delete user?")) return;
        if (item.loginProfileDate) {
            this.core.api.deleteLoginProfile(item.name);
        }
        if (item.policies) {
            for (var i in item.policies) {
                this.core.api.deleteUserPolicy(item.name, item.policies[i]);
            }
            sleep(1000)
        }
        if (item.accessKeys) {
            for (var i in item.accessKeys) {
                this.core.api.deleteAccessKey(item.accessKeys[i].id, item.name);
            }
            sleep(1000)
        }
        if (item.groups) {
            for (var i in item.groups) {
                this.core.api.removeUserFromGroup(item.name, item.groups[i].name);
            }
            sleep(1000)
        }
        this.core.api.deleteUser(item.name, function() {
            if (me.core.removeModel('users', item.name, 'name')) me.invalidate(); else me.refresh();
        });
    }
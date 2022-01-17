function(data) {
        // Summary:
        //    Add Tab for user-role relation into the project
        // Description:
        //    Add Tab for user-role relation into the project
        if (this._destroyed) {
            return;
        }

        var currentUser  = data[0].rights[phpr.currentUserId] ? phpr.currentUserId : 0;
        var users        = [];
        var userList     = phpr.userStore.getList();
        var relationList = this.roleStore.getRelationList();

        // Make an array with the users expect the current one
        if (userList) {
            for (var i in userList) {
                if (userList[i].id != currentUser) {
                    users.push({'id': userList[i].id, 'display': userList[i].display});
                }
            }
        }

        var rolesData = new phpr.Default.System.TemplateWrapper({
            templateName: "phpr.Project.template.roleTab.html",
            templateData: {
                accessUserText:   phpr.nls.get('User'),
                accessRoleText:   phpr.nls.get('Role'),
                accessActionText: phpr.nls.get('Action'),
                disabled:         (users.length === 0 || !this._accessPermissions) ? 'disabled="disabled"' : '',
                users:            users,
                roles:            this.roleStore.getList()
            }
        });

        this._rolesTab = rolesData;

        for (var i in relationList) {
            this._addRoleTabRow(relationList[i], currentUser);
        }
        this.garbageCollector.addNode(rolesData);

        var def = this.addTab([rolesData], 'tabRoles', 'Role', 'roleFormTab');

        def = def.then(dojo.hitch(this, function() {
            if (this._destroyed) {
                return;
            }

            // Add "add" button for role-user relation
            if (this._accessPermissions && users.length > 0) {
                this.addTinyButton('add', this._rolesTab.relationAddButton, 'newRoleUser');
            }

        }));

        return def;
    }
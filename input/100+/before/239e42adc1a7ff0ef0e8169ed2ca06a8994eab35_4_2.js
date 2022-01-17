function(data) {
        // Summary:
        //    Access tab
        // Description:
        //    Display all the users and the acces
        //    The user can assign to each user different access on the item
        if (this._destroyed) {
            return;
        }

        var userList      = this.userStore.getList();
        var accessContent = phpr.DataStore.getData({url: this._accessUrl});
        var currentUser   = data[0].rights[phpr.currentUserId] ? phpr.currentUserId : 0;
        var users         = [];

        if (userList) {
            for (var i in userList) {
                // Make an array with the users except the current one and the admin
                users.push({'id': userList[i].id, 'display': userList[i].display});
                // Found the name of each user
                if (accessContent[userList[i].id]) {
                    accessContent[userList[i].id].userDisplay = userList[i].display;
                }
            }
        }

        // Template for the access tab
        var accessData = new phpr.Default.System.TemplateWrapper({
            templateName: "phpr.Default.template.access.tab.html",
            templateData: {
                accessUserText:     phpr.nls.get('User'),
                accessReadText:     phpr.nls.get('Read'),
                accessWriteText:    phpr.nls.get('Write'),
                accessAccessText:   phpr.nls.get('Access'),
                accessCreateText:   phpr.nls.get('Create'),
                accessCopyText:     phpr.nls.get('Copy'),
                accessDeleteText:   phpr.nls.get('Delete'),
                accessDownloadText: phpr.nls.get('Download'),
                accessAdminText:    phpr.nls.get('Admin'),
                accessActionText:   phpr.nls.get('Action'),
                accessPermissions:  (users.length > 0) ? this._accessPermissions : false,
                users:              users
            }
        });
        this._accessTab = accessData;
        this.garbageCollector.addNode(accessData);

        for (var id in accessContent) {
            if (accessContent[id].userDisplay) {
                this._addAccessTabRow(accessContent[id], currentUser);
            }
        }

        var def = this.addTab([accessData], 'tabAccess', 'Access', 'accessFormTab');
        return def.then(dojo.hitch(this, function() {
            if (this._destroyed) {
                return;
            }

            // Add "add" button for access
            if (this._accessPermissions && users.length > 0) {
                this.addTinyButton('add', accessData.accessAddButton, 'newAccess');
                this.garbageCollector.addEvent(
                    dojo.connect(dijit.byId("checkAdminAccessAdd"),
                        "onClick", dojo.hitch(this, "checkAllAccess", "Add")));
            }
        }));
    }
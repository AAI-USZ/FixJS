function() {
        var view = phpr.viewManager.getView();
        var toolbar       = view.mainNavigation;
        var globalModules = phpr.DataStore.getData({url: phpr.globalModuleUrl});
        var isAdmin       = phpr.DataStore.getMetaData({url: phpr.globalModuleUrl});
        var button = null;
        var module = null;
        var moduleName = null;
        var that = this;

        toolbar.destroyDescendants();

        button = new phpr.Default.SearchButton({
            onChange: dojo.hitch(this, "showSearchSuggest"),
            onSubmit: dojo.hitch(this, "showSearchResults")
        });

        this.searchButton = button;

        toolbar.addChild(button);

        for (var i in globalModules) {
            moduleName = globalModules[i].name;
            button = null;
            try {
                module = phpr.pageManager.getModule(moduleName);
                button = module.getGlobalModuleNavigationButton(phpr.nls.get(globalModules[i].label, moduleName));
            } catch (e) {
                //error in button creation, ignore
                console.error("error while creating button for module " + moduleName);
                console.log(e);
                continue;
            }

            if (!button) {
                console.error("error while creating button for module " + moduleName);
                continue;
            }

            toolbar.addChild(button);
            this.globalModuleNavigationButtons[globalModules[i].name] = button;
            button = null;
        }

        if (isAdmin > 0) {
            // Administration
            button = new dijit.form.Button({
                label:     phpr.nls.get('Administration'),
                showLabel: true,
                onClick:   dojo.hitch(this, function() {
                    phpr.currentProjectId = phpr.rootProjectId;
                    phpr.pageManager.modifyCurrentState(
                        dojo.mixin(dojo.clone(this._emptyState), { moduleName: "Administration" }),
                        { forceModuleReload: true }
                    );
                })
            });

            toolbar.addChild(button);
            this.globalModuleNavigationButtons.Administration = button;
        }

        var menu = new dijit.Menu({style: "display: none;"});

        // Setting
        button = new dijit.MenuItem({
            label:     phpr.nls.get('Setting'),
            showLabel: true,
            onClick:   dojo.hitch(this, function() {
                phpr.currentProjectId = phpr.rootProjectId;
                phpr.pageManager.modifyCurrentState(
                    dojo.mixin(dojo.clone(this._emptyState), { moduleName: "Setting" }),
                    { forceModuleReload: true }
                );
            })
        });

        this.globalModuleNavigationButtons.Setting = button;

        menu.addChild(button);

        // Help
        button = new dijit.MenuItem({
            label:     phpr.nls.get('Help'),
            showLabel: true,
            onClick:   dojo.hitch(this, "showHelp")
        });

        menu.addChild(button);

        // Logout
        button = new dijit.MenuItem({
            label:     phpr.nls.get('Logout'),
            showLabel: true,
            onClick:   dojo.hitch(this, function() {
                location = phpr.webpath + 'index.php/Login/logout';
            })
        });

        menu.addChild(button);

        var userList = this.userStore.getList();
        var l = userList.length;
        var userName = "";
        for (var i = 0; i < l; i++) {
            if (userList[i].id == phpr.currentUserId) {
                userName = userList[i].display;
            }
        }

        button = new dijit.form.DropDownButton({
            label: userName,
            dropDown: menu
        });

        toolbar.addChild(button);

        phpr.tutorialAnchors.helpButton = button;

        // destroy cyclic refs
        button = null;
        menu = null;
        toolbar = null;
        this._registerGlobalModuleNavigationListener();
    }
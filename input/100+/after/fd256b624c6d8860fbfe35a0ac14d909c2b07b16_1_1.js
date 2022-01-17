function() {
        if (this.isDummy)
            return;

        this._shellInfo = new ShellInfo();

        this._viewSelector = new ViewSelector.ViewSelector();
        this._group.add_actor(this._viewSelector.actor);

        this._workspacesDisplay = new WorkspacesView.WorkspacesDisplay();
        this._viewSelector.addViewTab('windows', _("Windows"), this._workspacesDisplay.actor, 'text-x-generic');

        let appView = new AppDisplay.AllAppDisplay();
        this._viewSelector.addViewTab('applications', _("Applications"), appView.actor, 'system-run');

        // Default search providers
        // Wanda comes obviously first
        this.addSearchProvider(new Wanda.WandaSearchProvider());
        this.addSearchProvider(new AppDisplay.AppSearchProvider());
        this.addSearchProvider(new AppDisplay.SettingsSearchProvider());
        this.addSearchProvider(new PlaceDisplay.PlaceSearchProvider());

        // Load remote search providers provided by applications
        RemoteSearch.loadRemoteSearchProviders(Lang.bind(this, this.addSearchProvider));

        // TODO - recalculate everything when desktop size changes
        this._dash = new Dash.Dash();
        this._group.add_actor(this._dash.actor);
        this._dash.actor.add_constraint(this._viewSelector.constrainY);
        this._dash.actor.add_constraint(this._viewSelector.constrainHeight);
        this.dashIconSize = this._dash.iconSize;
        this._dash.connect('icon-size-changed',
                           Lang.bind(this, function() {
                               this.dashIconSize = this._dash.iconSize;
                           }));

        // Translators: this is the name of the dock/favorites area on
        // the left of the overview
        Main.ctrlAltTabManager.addGroup(this._dash.actor, _("Dash"), 'user-bookmarks');

        Main.layoutManager.connect('monitors-changed', Lang.bind(this, this._relayout));
        this._relayout();
    }
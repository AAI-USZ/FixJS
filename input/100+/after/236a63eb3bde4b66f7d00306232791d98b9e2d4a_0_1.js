function (metaWindow, app, isFavapp, params) {
        params = Params.parse(params, {
            hover: false
        });
        PopupMenu.PopupBaseMenuItem.prototype._init.call(this, params);

        this.metaWindow = metaWindow;
        this.app = app;
        this.isFavapp = isFavapp;

        this.actor.style_class = null;


        this.appContainer = new St.BoxLayout({
            style_class: 'switcher-list'
        });
        this.appContainer.set_style("padding: 6px;border-radius: 12px;");
        this.appThumbnails = {};

        this._refresh();

        this.addActor(this.appContainer);
    }
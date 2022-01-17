function(extension) {
        let box = new St.BoxLayout({ style_class: 'lg-extension', vertical: true });
        let name = new St.Label({ style_class: 'lg-extension-name',
                                   text: extension.metadata.name });
        box.add(name, { expand: true });
        let description = new St.Label({ style_class: 'lg-extension-description',
                                         text: extension.metadata.description || 'No description' });
        box.add(description, { expand: true });

        let metaBox = new St.BoxLayout({ style_class: 'lg-extension-meta' });
        box.add(metaBox);
        let stateString = this._stateToString(extension.state);
        let state = new St.Label({ style_class: 'lg-extension-state',
                                   text: this._stateToString(extension.state) });
        metaBox.add(state);

        let viewsource = new Link.Link({ label: _("View Source") });
        viewsource.actor._extension = extension;
        viewsource.actor.connect('clicked', Lang.bind(this, this._onViewSource));
        metaBox.add(viewsource.actor);

        if (extension.metadata.url) {
            let webpage = new Link.Link({ label: _("Web Page") });
            webpage.actor._extension = extension;
            webpage.actor.connect('clicked', Lang.bind(this, this._onWebPage));
            metaBox.add(webpage.actor);
        }

        let viewerrors = new Link.Link({ label: _("Show Errors") });
        viewerrors.actor._extension = extension;
        viewerrors.actor._parentBox = box;
        viewerrors.actor._isShowing = false;
        viewerrors.actor.connect('clicked', Lang.bind(this, this._onViewErrors));
        metaBox.add(viewerrors.actor);

        return box;
    }
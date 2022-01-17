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

        let viewsource = new St.Button({ reactive: true,
                                         track_hover: true,
                                         style_class: 'shell-link',
                                         label: _("View Source") });
        viewsource._extension = extension;
        viewsource.connect('clicked', Lang.bind(this, this._onViewSource));
        metaBox.add(viewsource);

        if (extension.metadata.url) {
            let webpage = new St.Button({ reactive: true,
                                          track_hover: true,
                                          style_class: 'shell-link',
                                          label: _("Web Page") });
            webpage._extension = extension;
            webpage.connect('clicked', Lang.bind(this, this._onWebPage));
            metaBox.add(webpage);
        }

        let viewerrors = new St.Button({ reactive: true,
                                         track_hover: true,
                                         style_class: 'shell-link',
                                         label: _("Show Errors") });
        viewerrors._extension = extension;
        viewerrors._parentBox = box;
        viewerrors._isShowing = false;
        viewerrors.connect('clicked', Lang.bind(this, this._onViewErrors));
        metaBox.add(viewerrors);

        return box;
    }
function(uuid, info, invocation) {
        this.parent({ styleClass: 'extension-dialog' });

        this._uuid = uuid;
        this._info = info;
        this._invocation = invocation;

        this.setButtons([{ label: _("Cancel"),
                           action: Lang.bind(this, this._onCancelButtonPressed),
                           key:    Clutter.Escape
                         },
                         { label:  _("Install"),
                           action: Lang.bind(this, this._onInstallButtonPressed)
                         }]);

        let message = _("Download and install '%s' from extensions.gnome.org?").format(info.name);

        let box = new St.BoxLayout();
        this.contentLayout.add(box);

        let gicon = new Gio.FileIcon({ file: Gio.File.new_for_uri(REPOSITORY_URL_BASE + info.icon) })
        let icon = new St.Icon({ gicon: gicon });
        box.add(icon);

        let label = new St.Label({ text: message });
        box.add(label);
    }
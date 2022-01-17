function(message, icon, reaskPassword) {
        let strings = message.split('\n');
        this.parent(strings[0]);

        this._notification = new ShellMountPasswordNotification(this, strings, icon, reaskPassword);
        this._setSummaryIcon(icon);

        // add ourselves as a source, and popup the notification
        Main.messageTray.add(this);
        this.notify(this._notification);
    }
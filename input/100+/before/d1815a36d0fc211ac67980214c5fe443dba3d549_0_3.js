function(message, gicon, reaskPassword) {
        this._gicon = gicon;

        let strings = message.split('\n');
        this.parent(strings[0]);
        this._notification = new ShellMountPasswordNotification(this, strings, reaskPassword);

        // add ourselves as a source, and popup the notification
        Main.messageTray.add(this);
        this.notify(this._notification);
    }
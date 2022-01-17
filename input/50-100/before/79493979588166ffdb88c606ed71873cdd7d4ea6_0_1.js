function(button, event) {
        this.close(global.get_current_time());

        // Even though the extension is already "uninstalled", send through
        // a state-changed signal for any users who want to know if the install
        // went through correctly -- using proper async DBus would block more
        // traditional clients like the plugin
        let meta = { uuid: this._uuid,
                     state: ExtensionSystem.ExtensionState.UNINSTALLED,
                     error: '' };

        _signals.emit('extension-state-changed', meta);
    }
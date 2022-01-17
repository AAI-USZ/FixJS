function(session, message) {
        if (message.status_code != Soup.KnownStatusCode.OK) {
            ExtensionSystem.logExtensionError(uuid, 'downloading info: ' + message.status_code);
            invocation.return_dbus_error('org.gnome.Shell.DownloadInfoError', message.status_code.toString());
            return;
        }

        let info;
        try {
            info = JSON.parse(message.response_body.data);
        } catch (e) {
            ExtensionSystem.logExtensionError(uuid, 'parsing info: ' + e);
            invocation.return_dbus_error('org.gnome.Shell.ParseInfoError', e.toString());
            return;
        }

        let dialog = new InstallExtensionDialog(uuid, info, invocation);
        dialog.open(global.get_current_time());
    }
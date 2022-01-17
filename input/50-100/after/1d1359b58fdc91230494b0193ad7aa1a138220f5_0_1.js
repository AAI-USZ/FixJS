function(session, message) {
        if (message.status_code != Soup.KnownStatusCode.OK) {
            ExtensionSystem.logExtensionError(uuid, 'downloading info: ' + message.status_code);
            return;
        }

        let info;
        try {
            info = JSON.parse(message.response_body.data);
        } catch (e) {
            ExtensionSystem.logExtensionError(uuid, 'parsing info: ' + e);
            return;
        }

        let dialog = new InstallExtensionDialog(uuid, info);
        dialog.open(global.get_current_time());
    }
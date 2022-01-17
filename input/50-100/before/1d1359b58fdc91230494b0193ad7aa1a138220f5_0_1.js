function installExtensionFromUUID(uuid) {
    let params = { uuid: uuid,
                   shell_version: Config.PACKAGE_VERSION };

    let message = Soup.form_request_new_from_hash('GET', REPOSITORY_URL_INFO, params);

    _httpSession.queue_message(message,
                               function(session, message) {
                                   let info = JSON.parse(message.response_body.data);
                                   let dialog = new InstallExtensionDialog(uuid, info);
                                   dialog.open(global.get_current_time());
                               });
}
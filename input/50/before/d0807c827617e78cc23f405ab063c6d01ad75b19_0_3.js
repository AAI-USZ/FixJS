function (actor) {
        let extension = actor._extension;
        Gio.app_info_launch_default_for_uri(extension.metadata.url, global.create_app_launch_context());
        Main.lookingGlass.close();
    }
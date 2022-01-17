function (actor) {
        let extension = actor._extension;
        let uri = extension.dir.get_uri();
        Gio.app_info_launch_default_for_uri(uri, global.create_app_launch_context());
        this._lookingGlass.close();
    }
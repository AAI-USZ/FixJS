function init(metaObject) {
    imports.gettext.bindtextdomain('gnome-shell-extensions', metaObject.metadata.localedir);
    return new PidginClient();
}
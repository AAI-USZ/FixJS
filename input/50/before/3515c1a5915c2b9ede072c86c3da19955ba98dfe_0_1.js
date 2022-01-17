function init(metadata) {
    imports.gettext.bindtextdomain('gnome-shell-extensions', imports.misc.config.LOCALEDIR);
    return new PidginClient();
}
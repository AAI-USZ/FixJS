function initTranslations(metadata) {
    let localeDir = metadata.dir.get_child('locale').get_path();
    Gettext.bindtextdomain('gnome-shell-extensions', localeDir);
}
function() {
    var host, port, password, path;

    UI.closeSettingsMenu();
    UI.toggleConnectPanel();

    host = $D('noVNC_host').value;
    port = $D('noVNC_port').value;
    password = $D('noVNC_password').value;
    path = $D('noVNC_path').value;
    if ((!host) || (!port)) {
        throw("Must set host and port");
    }

    UI.rfb.set_encrypt(UI.getSetting('encrypt'));
    UI.rfb.set_true_color(UI.getSetting('true_color'));
    UI.rfb.set_local_cursor(UI.getSetting('cursor'));
    UI.rfb.set_shared(UI.getSetting('shared'));
    UI.rfb.set_view_only(UI.getSetting('view_only'));
    UI.rfb.set_connectTimeout(UI.getSetting('connectTimeout'));
    UI.rfb.set_repeaterID(UI.getSetting('repeaterID'));

    UI.rfb.connect(host, port, password, path);

    //Close dialog.
    setTimeout(UI.setBarPosition, 100);
    $D('noVNC_logo').style.display = "none";
}
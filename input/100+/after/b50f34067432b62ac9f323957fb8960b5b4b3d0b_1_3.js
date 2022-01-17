function() {
    //Util.Debug(">> settingsApply");
    UI.saveSetting('encrypt');
    UI.saveSetting('true_color');
    if (UI.rfb.get_display().get_cursor_uri()) {
        UI.saveSetting('cursor');
    }
    UI.saveSetting('clip');
    UI.saveSetting('shared');
    UI.saveSetting('view_only');
    UI.saveSetting('connectTimeout');
    UI.saveSetting('path');
    UI.saveSetting('repeaterID');
    UI.saveSetting('stylesheet');
    UI.saveSetting('logging');

    // Settings with immediate (non-connected related) effect
    WebUtil.selectStylesheet(UI.getSetting('stylesheet'));
    WebUtil.init_logging(UI.getSetting('logging'));
    UI.setViewClip();
    UI.setViewDrag(UI.rfb.get_viewportDrag());
    //Util.Debug("<< settingsApply");
}
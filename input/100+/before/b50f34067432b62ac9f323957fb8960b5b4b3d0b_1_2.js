function() {
    // Close the description panel
    $D('noVNC_description').style.display = "none";
    if (UI.settingsOpen) {
        UI.settingsApply();
        UI.closeSettingsMenu();
    } else {
        UI.updateSetting('encrypt');
        UI.updateSetting('repeaterID');
        UI.updateSetting('true_color');
        if (UI.rfb.get_display().get_cursor_uri()) {
            UI.updateSetting('cursor');
        } else {
            UI.updateSetting('cursor', false);
            $D('noVNC_cursor').disabled = true;
        }
        UI.updateSetting('clip');
        UI.updateSetting('shared');
        UI.updateSetting('view_only');
        UI.updateSetting('connectTimeout');
        UI.updateSetting('path');
        UI.updateSetting('stylesheet');
        UI.updateSetting('logging');

        UI.openSettingsMenu();
    }
}
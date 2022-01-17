function() {
    var connected = UI.rfb_state === 'normal' ? true : false;

    //Util.Debug(">> updateVisualState");
    $D('noVNC_encrypt').disabled = connected;
    $D('noVNC_true_color').disabled = connected;
    if (UI.rfb && UI.rfb.get_display() &&
        UI.rfb.get_display().get_cursor_uri()) {
        $D('noVNC_cursor').disabled = connected;
    } else {
        UI.updateSetting('cursor', false);
        $D('noVNC_cursor').disabled = true;
    }
    $D('noVNC_shared').disabled = connected;
    $D('noVNC_view_only').disabled = connected;
    $D('noVNC_connectTimeout').disabled = connected;
    $D('noVNC_path').disabled = connected;
    $D('noVNC_repeaterID').disabled = connected;

    if (connected) {
        UI.setViewClip();
        UI.setMouseButton(1);
        $D('clipboardButton').style.display = "inline";
        $D('showKeyboard').style.display = "inline";
        $D('sendCtrlAltDelButton').style.display = "inline";
    } else {
        UI.setMouseButton();
        $D('clipboardButton').style.display = "none";
        $D('showKeyboard').style.display = "none";
        $D('sendCtrlAltDelButton').style.display = "none";
    }
    // State change disables viewport dragging.
    // It is enabled (toggled) by direct click on the button
    UI.setViewDrag(false);

    switch (UI.rfb_state) {
        case 'fatal':
        case 'failed':
        case 'loaded':
        case 'disconnected':
            $D('connectButton').style.display = "";
            $D('disconnectButton').style.display = "none";
            break;
        default:
            $D('connectButton').style.display = "none";
            $D('disconnectButton').style.display = "";
            break;
    }

    //Util.Debug("<< updateVisualState");
}
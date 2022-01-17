function (show, zIndex) {
        if (menuVisible || menuPeeked) {
            return;
        }
        window.qnx.webplatform.getController().remoteExec(1, 'webview.setSensitivity', ['SensitivityNoFocus']);
        var menu = document.getElementById('contextMenu'),
            handle = document.getElementById('contextMenuHandle');
        handle.className = 'showContextMenuHandle';
        menuVisible = false;
        menuPeeked = true;
        menu.className = 'peekContextMenu';
    }
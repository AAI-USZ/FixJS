function (show, zIndex) {
        if (menuVisible || menuPeeked) {
            return;
        }
        window.qnx.webplatform.getController().remoteExec(1, 'webview.setSensitivity', ['SensitivityNoFocus']);
        var menu = document.getElementById('contextMenu'),
            handle = document.getElementById('contextMenuHandle'),
            menuContent = document.getElementById('contextMenuContent'),
            menuItems = document.getElementsByClassName('menuItem');
        menu.style.overflowY = 'hidden';
        menuContent.style.overflowY = 'hidden';
        //TODO: what's the height for landscape mode
        menuContent.style.height = '67%';
        if (menuItems.length > 7) {
            handle.className = 'showMoreActionsHandle';
        } else {
            handle.className = 'showContextMenuHandle';
        }
        menuVisible = false;
        menuPeeked = true;
        menu.className = 'peekContextMenu';
    }
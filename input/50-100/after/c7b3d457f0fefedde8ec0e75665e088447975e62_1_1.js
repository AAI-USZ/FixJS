function (evt) {
        if (menuVisible) {
            return;
        }
        var menu = document.getElementById('contextMenu'),
            menuContent = document.getElementById('contextMenuContent');
        menu.className = 'showMenu';
        menuVisible = true;
        menu.style.overflowY = 'scroll';
        menuContent.style.height = '';
        menuContent.style.overflowY = '';
        if (menuPeeked) {
            evt.cancelBubble = true;
            menuPeeked = false;
        }
    }
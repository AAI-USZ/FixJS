function handleTouchEnd(actionId, menuItem) {
    if(menuItem) {
        menuItem.className = 'menuItem peekItem';
    }
    window.qnx.webplatform.getController().remoteExec(1, 'executeMenuAction', [actionId]);
}
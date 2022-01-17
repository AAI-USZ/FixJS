function handleTouchEnd(actionId) {
    window.qnx.webplatform.getController().remoteExec(1, 'executeMenuAction', [actionId]);
}
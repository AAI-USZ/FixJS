function () {
    if (!DebugBridge.initialized) {
        DebugBridge.initialize();
        DebugBridge.initialized = true;
    }

    this.autoStartDaemon = true;
}
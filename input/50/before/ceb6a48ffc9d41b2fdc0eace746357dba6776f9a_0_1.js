function () {
    if (!DebugBridge.initialized) {
        DebugBridge.initialize();
        DebugBridge.initialized = true;
    }
}
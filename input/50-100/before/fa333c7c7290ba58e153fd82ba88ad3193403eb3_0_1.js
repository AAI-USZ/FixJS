function(aOptions, aCallback) {
    // Configure console.debug() behavior
    configDebug(aOptions.staticArgs.debug);

    // Requests logger
    TabRequestsLogger();

    // Dock
    SplitDock(DockOptions);

    // Toolbar Button
    ToolbarButton(ButtonOptions);

    // Context menu
    contextMenu.Item(MenuOptions);

    // Open about page on install
    if (aOptions.loadReason == "install") {
        tabs.open(self.data.url("about/index.html"));
    }
}
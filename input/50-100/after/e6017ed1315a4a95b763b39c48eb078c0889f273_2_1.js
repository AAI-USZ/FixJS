function(aOptions, aCallback) {
    // Debug configuration
    if (aOptions.staticArgs.debug) {
        require("tools/debug").debugConf["func"] = console.debug;
    }

    // Requests logger
    TabRequestsLogger();

    // Dock
    SplitDock(DockOptions);

    // Toolbar Button
    ToolbarButton(ButtonOptions);

    // Context menu
    contextMenu.Item(MenuOptions);

    // Open about page on install
    if (self.loadReason == "install") {
        tabs.open(self.data.url("about/index.html"));
    }
}
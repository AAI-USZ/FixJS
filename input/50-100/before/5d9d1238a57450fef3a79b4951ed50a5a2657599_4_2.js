function(event)
{
    if (event.handled)
        return;

    if (event.keyIdentifier === "U+001B") { // Escape key
        // If drawer is open with some view other than console then close it.
        if (!this._toggleConsoleButton.toggled && WebInspector.drawer.visible)
            this.closeViewInDrawer();
        else
            this._toggleConsoleButtonClicked();
    }
}
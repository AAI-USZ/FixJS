function(panelType, enable)
    {
        if (!enable)
        {
            // Iterate all contexts and destroy all instances of the specified panel.
            var self = this;
            Firebug.connection.eachContext(function(context) {
                context.destroyPanel(panelType, context.persistedState);
            });
        }

        panelType.prototype.onActivationChanged(enable);

        Firebug.chrome.$("fbPanelBar1").updateTab(panelType);
        Firebug.chrome.syncPanel();
    }
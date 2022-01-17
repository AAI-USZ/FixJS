function()
    {
        var tab = this.core.getCurrentTab();
        return tab && tab.name.indexOf('.vpc') > 0 ? true : false;
    }
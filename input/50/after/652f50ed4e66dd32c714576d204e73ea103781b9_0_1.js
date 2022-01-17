function()
    {
        var tab = this.getCurrentTab();
        return tab && tab.name.indexOf('.vpc') > 0 ? true : false;
    }
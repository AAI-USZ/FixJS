function()
    {
        var selection = this.listItemElement.createChild("div", "selection");
        this.listItemElement.insertBefore(selection, this.listItemElement.firstChild);
    }
function(name, value)
    {
        var options = [
            "showCommentNodes",
            "entityDisplay",
            "showTextNodesWithWhitespace",
            "showFullTextNodes"
        ];

        var isRefreshOption = function(element) { return element == name; };
        if (options.some(isRefreshOption))
        {
            this.resetSearch();
            Dom.clearNode(this.panelNode);
            if (this.ioBox)
                this.ioBox.destroy();

            this.ioBox = new Firebug.InsideOutBox(this, this.panelNode);
            this.ioBox.select(this.selection, true, true);
        }
    }
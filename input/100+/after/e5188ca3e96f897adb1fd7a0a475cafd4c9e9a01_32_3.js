function(name, value)
    {
        var options = new Set();
        options.add("showCommentNodes");
        options.add("entityDisplay");
        options.add("showTextNodesWithWhitespace");
        options.add("showFullTextNodes");

        if (options.has(name))
        {
            this.resetSearch();
            Dom.clearNode(this.panelNode);
            if (this.ioBox)
                this.ioBox.destroy();

            this.ioBox = new Firebug.InsideOutBox(this, this.panelNode);
            this.ioBox.select(this.selection, true, true);
        }
    }
function(name, value)
    {
        var options = [
            "showCommentNodes",
            "entityDisplay",
            "showTextNodesWithWhitespace",
            "showFullTextNodes"
        ];

        if (options.indexOf(name) !== -1)
        {
            this.resetSearch();
            Dom.clearNode(this.panelNode);
            if (this.ioBox)
                this.ioBox.destroy();

            this.ioBox = new Firebug.InsideOutBox(this, this.panelNode);
            this.ioBox.select(this.selection, true, true);
        }
    }
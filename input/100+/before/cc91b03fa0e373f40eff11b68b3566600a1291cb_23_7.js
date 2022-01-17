function(text)
    {
        if (!text)
            return;

        // Make previously visible nodes invisible again
        if (this.matchSet)
        {
            for (var i in this.matchSet)
                Css.removeClass(this.matchSet[i], "matched");
        }

        this.matchSet = [];

        function findRow(node) { return Dom.getAncestorByClass(node, "cookieRow"); }
        var search = new TextSearch(this.panelNode, findRow);

        var cookieRow = search.find(text);
        if (!cookieRow)
            return false;

        for (; cookieRow; cookieRow = search.findNext())
        {
            Css.setClass(cookieRow, "matched");
            this.matchSet.push(cookieRow);
        }

        return true;
    }
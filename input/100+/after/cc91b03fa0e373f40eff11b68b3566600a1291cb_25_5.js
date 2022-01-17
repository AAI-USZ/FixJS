function(parentNode)
    {
        // Create cookie table UI.
        var table = this.tableTag.replace({}, parentNode, this);

        // Update columns width according to the preferences.
        var header = Dom.getElementByClass(table, "cookieHeaderRow");
        var columns = header.getElementsByTagName("td");
        for (var i=0; i<columns.length; i++)
        {
            var col = columns[i];
            var colId = col.getAttribute("id");
            if (!colId || !col.style)
                continue;

            var width = Options.get("cookies." + colId + ".width");
            if (width)
                col.style.width = width + "px";
        }

        return table;
    }
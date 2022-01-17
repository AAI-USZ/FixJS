function(clickedCookie)
    {
        var text = "";
        var tbody = Dom.getAncestorByClass(clickedCookie.row, "cookieTable").firstChild;
        for (var row = tbody.firstChild; row; row = row.nextSibling) {
            if (Css.hasClass(row, "cookieRow") && row.repObject)
                text += row.repObject.toString() + "\n";
        }

        System.copyToClipboard(text);
    }
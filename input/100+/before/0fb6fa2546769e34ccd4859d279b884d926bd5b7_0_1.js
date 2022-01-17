function() {
        for (i in siteSearch.results) {
            sr.append(siteSearch.results[i].html.cloneNode(true));
        }

        var cursor = siteSearch.cursor;
        if (!cursor && siteSearch.results.length == 0) {
            sr.html("<p>No results found.</p>");
        } else if (cursor.currentPageIndex < cursor.pages.length - 1) {
            // this is recursive. google.search will re-call its callback, i.e.
            // this function when it gets the next page of result.
            siteSearch.gotoPage(cursor.currentPageIndex + 1);
        }
    }
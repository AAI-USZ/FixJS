function() {
        var clone;

        for (i in siteSearch.results) {
            clone = siteSearch.results[i].html.cloneNode(true);

            /* START:  Remove before launch */
            $(clone.childNodes).each(function() {
                var $this = $(this);
                $this.html($this.html().replace(/developer.mozilla\.org/g, window.location.hostname));
            });
            /* FINISH:  Remove before launch */
            
            $sr.append(clone);
        }

        var cursor = siteSearch.cursor;
        if (!cursor && siteSearch.results.length == 0) {
            $sr.html("<p>No results found.</p>");
        } else if (cursor.currentPageIndex < cursor.pages.length - 1) {
            // this is recursive. google.search will re-call its callback, i.e.
            // this function when it gets the next page of result.
            siteSearch.gotoPage(cursor.currentPageIndex + 1);
        }
    }
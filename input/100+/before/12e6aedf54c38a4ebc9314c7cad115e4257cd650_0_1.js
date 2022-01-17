function() {
        var bibkeys = [];
        $("div [id^=openlibrary-thumbnail]").each(function(i) {
            bibkeys.push("ISBN:" + $(this).attr("class")); // id=isbn
        });
        bibkeys = bibkeys.join(',');
        var scriptElement = document.createElement("script");
        scriptElement.setAttribute("id", "jsonScript");
        scriptElement.setAttribute("src",
            "http://openlibrary.org/api/books?bibkeys=" + escape(bibkeys) +
            "&callback=KOHA.OpenLibrary.olCallBack");
        scriptElement.setAttribute("type", "text/javascript");
        document.documentElement.firstChild.appendChild(scriptElement);

    }
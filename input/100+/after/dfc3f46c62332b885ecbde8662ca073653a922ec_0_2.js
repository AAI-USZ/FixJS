function responseArrived(result) {

      var bookmarks = JSON.parse(result);

      if (bookmark_menubar.childNodes.length > 0) {

        // see the following iterative interesting code snippet (https://developer.mozilla.org/en/DOM/Node.childNodes)

        while (bookmark_menubar.firstChild) {

          //The list is LIVE so it will re-index each call

          bookmark_menubar.removeChild(bookmark_menubar.firstChild);

        }

      }

      bookmarks.items.sort(sortBy('value', false, function(a){return a.toUpperCase()}));

      for (var i = 0; i < bookmarks.items.length; i++) {

        //

        var bookmark = bookmarks.items[i];

        var somemark = document.createElement("menuitem");

        // 

        somemark.setAttribute("label", bookmark.value);

        somemark.setAttribute("value", bookmark.id);

        somemark.setAttribute("oncommand", lookmarker.onOpenBookmark(undefined));

        // 

        bookmark_menubar.appendChild(somemark);

      }

      dump("INFO: " + bookmarks.items.length + " bookmarks loaded" + "\n");

    }
function responseArrived(result) {

      var topicmaps = JSON.parse(result);

      // dump("DEBUG: loaded " + topicmaps.items.length + " maps");

      if (topicmap_menubar.childNodes.length > 0) {

        // see the following iterative interesting code snippet (https://developer.mozilla.org/en/DOM/Node.childNodes)

        while (topicmap_menubar.firstChild) {

          //The list is LIVE so it will re-index each call

          topicmap_menubar.removeChild(topicmap_menubar.firstChild);

        }

      }

      topicmaps.items.sort(sortBy('value', false, function(a){return a.toUpperCase()}));

      for (var i = 0; i < topicmaps.items.length; i++) {

        var topicmap = topicmaps.items[i];

        var someitem = document.createElement("menuitem");



        someitem.setAttribute("label", topicmap.value);

        someitem.setAttribute("value", topicmap.id);

        someitem.setAttribute("oncommand", lookmarker.onOpenTopicmap(undefined));

        topicmap_menubar.appendChild(someitem);

        // topicmap_menulist.appendChild(menuitem);

      }

      dump("INFO: " + topicmaps.items.length + " topic maps loaded" + "\n");

    }
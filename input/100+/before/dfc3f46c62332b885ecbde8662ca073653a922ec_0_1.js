function() {

    // initialization code

    lookmarker.prefManager = Components.classes["@mozilla.org/preferences-service;1"].

      getService(Components.interfaces.nsIPrefBranch);

    lookmarker.statusLabel = document.getElementById("deepaMehtaStatusLabel");

    lookmarker.updatePreferences();

    // new placement of our toolbarbutton and new statuslabel // credits to mike.kaply.com for "new add-on bar" blogpost

    var addonBar = document.getElementById("addon-bar");

    if (addonBar) {

      if (!document.getElementById("lookmarker-toolbar-button")) {

        // if not yet elsewhere present, place the button in the addon-bar and show it

        var addonBarCloseButton = document.getElementById("addonbar-closebutton")

        addonBar.insertItem("lookmarker-toolbar-button", addonBarCloseButton.nextSibling);

        addonBar.collapsed = false;

      }

    }

    // 

    this.strings = document.getElementById("lookmarker-strings");

    this.topicmap_menubar = document.getElementById("topicmap-menubar-popup");

    this.bookmark_menubar = document.getElementById("bookmark-menubar-popup");

    // this.topicmap_menulist = document.getElementById("topicmap-menulist-popup");

    if ( !lookmarker.initialized ) {

      // bookmarks

      lookmarker.populateBookmarks();

      // maps

      lookmarker.populateTopicmaps();

    }

    // make sure this is called just once..

    lookmarker.initialized = true;

  }
function BG_ensurePlacesDefaultQueriesInitialized() {
    // This is actual version of the smart bookmarks, must be increased every
    // time smart bookmarks change.
    // When adding a new smart bookmark below, its newInVersion property must
    // be set to the version it has been added in, we will compare its value
    // to users' smartBookmarksVersion and add new smart bookmarks without
    // recreating old deleted ones.
    const SMART_BOOKMARKS_VERSION = 3;
    const SMART_BOOKMARKS_ANNO = "Places/SmartBookmark";
    const SMART_BOOKMARKS_PREF = "browser.places.smartBookmarksVersion";

    // TODO bug 399268: should this be a pref?
    const MAX_RESULTS = 10;

    // Get current smart bookmarks version.  If not set, create them.
    let smartBookmarksCurrentVersion = 0;
    try {
      smartBookmarksCurrentVersion = Services.prefs.getIntPref(SMART_BOOKMARKS_PREF);
    } catch(ex) {}

    // If version is current or smart bookmarks are disabled, just bail out.
    if (smartBookmarksCurrentVersion == -1 ||
        smartBookmarksCurrentVersion >= SMART_BOOKMARKS_VERSION) {
      return;
    }

    let batch = {
      runBatched: function BG_EPDQI_runBatched() {
        let menuIndex = 0;
        let toolbarIndex = 0;
        let bundle = Services.strings.createBundle("chrome://communicator/locale/places/places.properties");

        let smartBookmarks = {
          MostVisited: {
            title: bundle.GetStringFromName("mostVisitedTitle"),
            uri: NetUtil.newURI("place:redirectsMode=" +
                                Components.interfaces.nsINavHistoryQueryOptions.REDIRECTS_MODE_TARGET +
                                "&sort=" +
                                Components.interfaces.nsINavHistoryQueryOptions.SORT_BY_VISITCOUNT_DESCENDING +
                                "&maxResults=" + MAX_RESULTS),
            parent: PlacesUtils.toolbarFolderId,
            position: toolbarIndex++,
            newInVersion: 1
          },
          RecentlyBookmarked: {
            title: bundle.GetStringFromName("recentlyBookmarkedTitle"),
            uri: NetUtil.newURI("place:folder=BOOKMARKS_MENU" +
                                "&folder=UNFILED_BOOKMARKS" +
                                "&folder=TOOLBAR" +
                                "&queryType=" +
                                Components.interfaces.nsINavHistoryQueryOptions.QUERY_TYPE_BOOKMARKS +
                                "&sort=" +
                                Components.interfaces.nsINavHistoryQueryOptions.SORT_BY_DATEADDED_DESCENDING +
                                "&maxResults=" + MAX_RESULTS +
                                "&excludeQueries=1"),
            parent: PlacesUtils.bookmarksMenuFolderId,
            position: menuIndex++,
            newInVersion: 1
          },
          RecentTags: {
            title: bundle.GetStringFromName("recentTagsTitle"),
            uri: NetUtil.newURI("place:"+
                                "type=" +
                                Components.interfaces.nsINavHistoryQueryOptions.RESULTS_AS_TAG_QUERY +
                                "&sort=" +
                                Components.interfaces.nsINavHistoryQueryOptions.SORT_BY_LASTMODIFIED_DESCENDING +
                                "&maxResults=" + MAX_RESULTS),
            parent: PlacesUtils.bookmarksMenuFolderId,
            position: menuIndex++,
            newInVersion: 1
          }
        };

        // Set current itemId, parent and position if Smart Bookmark exists,
        // we will use these informations to create the new version at the same
        // position.
        let smartBookmarkItemIds = PlacesUtils.annotations.getItemsWithAnnotation(SMART_BOOKMARKS_ANNO);
        smartBookmarkItemIds.forEach(function (itemId) {
          let queryId = PlacesUtils.annotations.getItemAnnotation(itemId, SMART_BOOKMARKS_ANNO);
          if (queryId in smartBookmarks) {
            let smartBookmark = smartBookmarks[queryId];
            smartBookmark.itemId = itemId;
            smartBookmark.parent = PlacesUtils.bookmarks.getFolderIdForItem(itemId);
            smartBookmark.position = PlacesUtils.bookmarks.getItemIndex(itemId);
          } else {
            // We don't remove old Smart Bookmarks because user could still
            // find them useful, or could have personalized them.
            // Instead we remove the Smart Bookmark annotation.
            PlacesUtils.annotations.removeItemAnnotation(itemId, SMART_BOOKMARKS_ANNO);
          }
        });

        for (let queryId in smartBookmarks) {
          let smartBookmark = smartBookmarks[queryId];

          // We update or create only changed or new smart bookmarks.
          // Also we respect user choices, so we won't try to create a smart
          // bookmark if it has been removed.
          if (smartBookmarksCurrentVersion > 0 &&
              smartBookmark.newInVersion <= smartBookmarksCurrentVersion &&
              !smartBookmark.itemId)
            continue;

          // Remove old version of the smart bookmark if it exists, since it
          // will be replaced in place.
          if (smartBookmark.itemId) {
            PlacesUtils.bookmarks.removeItem(smartBookmark.itemId);
          }

          // Create the new smart bookmark and store its updated itemId.
          smartBookmark.itemId =
            PlacesUtils.bookmarks.insertBookmark(smartBookmark.parent,
                                                 smartBookmark.uri,
                                                 smartBookmark.position,
                                                 smartBookmark.title);
          PlacesUtils.annotations.setItemAnnotation(smartBookmark.itemId,
                                                    SMART_BOOKMARKS_ANNO,
                                                    queryId, 0,
                                                    PlacesUtils.annotations.EXPIRE_NEVER);
        }

        // If we are creating all Smart Bookmarks from ground up, add a
        // separator below them in the bookmarks menu.
        if (smartBookmarksCurrentVersion == 0 &&
            smartBookmarkItemIds.length == 0) {
          let id = PlacesUtils.bookmarks.getIdForItemAt(PlacesUtils.bookmarksMenuFolderId,
                                                        menuIndex);
          // Don't add a separator if the menu was empty or there is one already.
          if (id != -1 &&
              PlacesUtils.bookmarks.getItemType(id) != PlacesUtils.bookmarks.TYPE_SEPARATOR) {
            PlacesUtils.bookmarks.insertSeparator(PlacesUtils.bookmarksMenuFolderId,
                                                  menuIndex);
          }
        }
      }
    };

    try {
      PlacesUtils.bookmarks.runInBatchMode(batch, null);
    }
    catch(ex) {
      Components.utils.reportError(ex);
    }
    finally {
      Services.prefs.setIntPref(SMART_BOOKMARKS_PREF, SMART_BOOKMARKS_VERSION);
      Services.prefs.savePrefFile(null);
    }
  }
function BG_EPDQI_runBatched() {
        let menuIndex = 0;
        let toolbarIndex = 0;
        let bundle = Services.strings.createBundle("chrome://communicator/locale/places/places.properties");

        let smartBookmarks = {
          MostVisited: {
            title: bundle.GetStringFromName("mostVisitedTitle"),
            uri: NetUtil.newURI("place:sort=" +
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
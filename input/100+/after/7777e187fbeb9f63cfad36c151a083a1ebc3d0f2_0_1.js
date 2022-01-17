function()
	{
		var options = historyService.getNewQueryOptions();
		var query = historyService.getNewQuery();
		var folderList = new Array();
		var maxMatchingChars = -1;
		var closestBookmarkList = new Array();
		folderList.push(bookmarksService.bookmarksMenuFolder);
		folderList.push(bookmarksService.unfiledBookmarksFolder);
		folderList.push(bookmarksService.toolbarFolder);
		while (folderList.length > 0)
		{
			query.setFolders([ folderList.pop() ], 1);
			var result = historyService.executeQuery(query, options);
			var rootNode = result.root;
			rootNode.containerOpen = true;
			for ( var i = 0; i < rootNode.childCount; i++)
			{
				var node = rootNode.getChild(i);
				if (node.type == node.RESULT_TYPE_FOLDER)
				{
					folderList.push(node.itemId);
				}
				else
				{
					var numMatchingChars = 0;
					for ( var j = 1; j < node.uri.length
							&& j < content.document.URL.length; j++)
					{
						if (node.uri.substr(0, j) == content.document.URL
								.substr(0, j))
							numMatchingChars = j;
						else
							break;
					}
					if (numMatchingChars > maxMatchingChars)
					{
						closestBookmarkList = new Array();
						maxMatchingChars = numMatchingChars;
					}
					if (numMatchingChars >= maxMatchingChars)
					{
						closestBookmarkList.push(node);
					}
				}
			}
			// close a container after using it!
			rootNode.containerOpen = false;
		}
		if (maxMatchingChars < 10)
			alert("Could not find any bookmark that shares at least 10 characters!");
		else
			if (closestBookmarkList.length == 1)
			{
				var tagService = Components.classes["@mozilla.org/browser/tagging-service;1"]
						.getService(Components.interfaces.nsITaggingService);
				var oldURI = ios.newURI(closestBookmarkList[0].uri, null, null);
				var oldTags = tagService.getTagsForURI(oldURI, {});
				var newURI = ios.newURI(content.document.URL, null, null);
				bookmarksService.changeBookmarkURI(
						closestBookmarkList[0].itemId, newURI);
				tagService.untagURI(oldURI, oldTags);
				tagService.tagURI(newURI, oldTags);
			}
			else
			{
				var nodeList = "";
				for ( var h = 0; h < closestBookmarkList.length; h++)
					nodeList = nodeList + "  " + closestBookmarkList[h].uri
							+ "\n";
				alert("Could not find a unique closest bookmark. Found "
						+ closestBookmarkList.length + " closest bookmarks:\n"
						+ nodeList);
			}
	}
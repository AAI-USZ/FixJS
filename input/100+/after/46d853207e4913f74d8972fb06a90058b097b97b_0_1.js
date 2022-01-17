function (item) {

		// assume the item is unique
		var returnValue = true;

		// (debug) display what this item can be queried for
		//		for (var i in item) {
		//			Zotero.debug("Item field " + i + ": " + item[i]);
		//		}

		// useful fields: title, publicationTitle, volume, issue, publisher, ISBN, ISSN, url, date, pages, DOI


		// perform SQL queries to check for pre-existing item		
		
		var doi = null, url = null, title = null, lastName = null;

		if (item.hasOwnProperty("DOI")) {
			doi = item["DOI"];
		}

		if (item.hasOwnProperty("url")) {
			url = item["url"];
		}
				
		if (item.hasOwnProperty("title")) {
			title = item["title"];
		}

		if (item.hasOwnProperty("creators") && item["creators"].hasOwnProperty(0)) {
			if (item["creators"][0].hasOwnProperty("lastName")) {
				lastName = item["creators"][0]["lastName"];
			}
		}

		var sql = "SELECT itemID FROM items "
					+ "WHERE itemTypeID NOT IN (1, 14) "
					+ "AND itemID NOT IN (SELECT itemID FROM deletedItems) ";

		var append = "AND itemID in (SELECT itemID FROM items JOIN itemData USING (itemID) "
					+ "JOIN itemDataValues USING (valueID) ";

		if (doi != null) {
			var doiResults = Zotero.DB.query(sql + append + "WHERE fieldID = 26 AND value = ?);", [doi]);
			if (doiResults.length > 0) {
				returnValue = Zotero.PreventDuplicates.prompt(doiResults[0]["itemID"]);

				// if DOI matches, stop search
				return returnValue;
			}
		}
		
		if (url != null) {
			var urlResults = Zotero.DB.query(sql + append + "WHERE fieldID = 1 AND value = ?);", [url]);
			if (urlResults.length > 0) {
				returnValue = Zotero.PreventDuplicates.prompt(urlResults[0]["itemID"]);

				// if URL matches, stop search
				return returnValue;
			}
		}

		if (title != null || lastName != null) {
			if (title != null) {
				sql += append + "WHERE fieldID BETWEEN 110 AND 113 AND value LIKE ?) ";
			}

			if (lastName != null) {
				sql += "AND itemID in (SELECT itemID FROM items JOIN itemCreators USING (itemID) "
					+  "JOIN creators USING (creatorID) "
					+  "JOIN creatorData USING (creatorDataID) "
					+  "WHERE lastName LIKE ?)";
			}
			sql += ";";

			var thisTitle = Zotero.PreventDuplicates.normalizeString(item.title);
			
			if (title != null && lastName != null) {
				var titleLastNameResults = Zotero.DB.query(sql, [thisTitle, lastName]);
				if (titleLastNameResults.length > 0) {
					returnValue = Zotero.PreventDuplicates.prompt(titleLastNameResults[0]["itemID"]);
				}
			}		
		}			

		return returnValue;
	}
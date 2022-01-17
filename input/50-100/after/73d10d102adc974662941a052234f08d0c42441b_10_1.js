function (citationIndex) {
		var indexes = [],
			citations = getCitations();

		console.log("index = " + citationIndex);
		$.each(citations[citationIndex].citationItems, function (i, citationItem) {
			indexes.push(parseInt(citationItem.id.replace("ITEM-", "")) - 1);
		});

		return indexes;
	}
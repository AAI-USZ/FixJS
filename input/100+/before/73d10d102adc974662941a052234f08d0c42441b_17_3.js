function () {
		var jsonDocuments = cslServerConfig.jsonDocuments;
		document.getElementById("explanation").innerHTML = "<i>Please edit this example citation to match the style you are searching for.<br />";
		document.getElementById("exampleDocument").innerHTML =
			"<p align=center><strong>Example Article</stong></p>" +
			"<table>" +
			"<tr><td>Title:</td><td>" + jsonDocuments["ITEM-1"].title + "</td></tr>" +
			"<tr><td>Authors:</td><td>" + authorString(jsonDocuments["ITEM-1"].author) + "</td></tr>" + 
			"<tr><td>Year:</td><td>" + jsonDocuments["ITEM-1"].issued["date-parts"][0][0] + "</td></tr>" +
			"<tr><td>Publication:</td><td>" + jsonDocuments["ITEM-1"]["container-title"] + "</td></tr>" +
			"<tr><td>Volume:</td><td>" + jsonDocuments["ITEM-1"]["volume"] + "</td></tr>" +
			"<tr><td>Issue:</td><td>" + jsonDocuments["ITEM-1"]["issue"] + "</td></tr>" +
			"<tr><td>Chapter:</td><td>" + jsonDocuments["ITEM-1"]["chapter-number"] + "</td></tr>" +
			"<tr><td>Pages:</td><td>" + jsonDocuments["ITEM-1"]["page"] + "</td></tr>" +
			"<tr><td>Publisher:</td><td>" + jsonDocuments["ITEM-1"]["publisher"] + "</td></tr>" +
			"<tr><td>Document type:</td><td>" + jsonDocuments["ITEM-1"]["type"] + "</td></tr>" +
			"</table>";
	}
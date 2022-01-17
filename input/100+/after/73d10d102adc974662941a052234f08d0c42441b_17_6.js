function () {
		var jsonDocument = CSLEDIT.exampleData.jsonDocumentList[exampleIndex],
			table,
			rows = [];
		
		table = $("<table/>");

		$.each(jsonDocument, function (key, value) {
			var order = CSLEDIT.uiConfig.fieldOrder.indexOf(key),
				valueString;

			if (order === -1) {
				order = CSLEDIT.uiConfig.fieldOrder.length;
			}

			if (key === "author" || key === "editor" || key === "translator") {
				valueString = personString(value);
			} else if (key === "issued" || key === "accessed") {
				valueString = value["date-parts"][0].join("/");
			} else if (typeof(value) === "object") {
				valueString = JSON.stringify(value);
			} else {
				valueString = value;
			}

			if (valueString === "") {
				// skip empty field
				return true;
			}

			rows.push({
				html : "<tr><td>" + CSLEDIT.uiConfig.capitaliseFirstLetter(key) + "</td><td>" + valueString + "</td></td>",
				order : order
			});
		});

		rows.sort(function (a,b) {return a.order - b.order;});

		$.each(rows, function (i, row) {
			table.append(row.html);
		});

		document.getElementById("explanation").innerHTML = "<i>Please edit this example citation to match the style you are searching for.<br />";

		$("#exampleDocument").children().remove();
		$("#exampleDocument").append(table);
	}
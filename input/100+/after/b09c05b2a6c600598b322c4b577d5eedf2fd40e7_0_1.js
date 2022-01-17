function (i) {

		var subset = {

				subsetURI : $(this).find("div span.ibtn").attr("resource"),

				subsetName : $(this).find("div span.subsetName").text(),

				subsetNSURI : $(this).find("div span.subsetNSURI").text()

		};

		subsetList.push(subset);

	}
function (elCell, oRecord, oColumn, oData) {
		if (!oData) {
			$(elCell).html(oData);
			return;
		}
		var outputContainer = $("<span/>");

		var removed = oData.replace(/[\n|\r\n]/g, " ");
		var broken = pub.breakOnToken(removed, " ", 600);
		outputContainer.html(broken);
		$(elCell).html("");
		elCell.appendChild(outputContainer[0]);
	}
function(elCell, oRecord, oColumn, oData)
	{
		if (!oData)
		{
			$(elCell).html(oData);
			return;
		}
		var outputContainer = $("<span/>");

		var removed = oData.replace(/[\n|\r\n]/g, " ");
		var broken = pub.breakOnToken(removed, " ", 400);
		outputContainer.html(broken.replace(/[\n|\r\n]/g, "<br/>"));
		$(elCell).html("");
		elCell.appendChild(outputContainer[0]);
	}
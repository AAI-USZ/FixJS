function(str, token, maxLinePxls) {
		var dispStrs = new Array();
		var displayStr = str;
		if (str) {
			var splitPoint;
			do {
				splitPoint = getSplitPoint(str, maxLinePxls, token);
				if (splitPoint > 0) {
					dispStrs.push(str.slice(0, splitPoint));
				}
				else {
					splitPoint = getSplitPoint(str, maxLinePxls, token, "");
				}
				str = str.substr(splitPoint);

			}
			while (getWidthForColumnText(str) > maxLinePxls && splitPoint > 0);

			dispStrs.push(str);

			displayStr = new String();
			for (var x = 0; x < dispStrs.length; x++) {
				displayStr += dispStrs[x];
				if (x < dispStrs.length - 1) {
					displayStr += "<br/>";
				}
			}
		}
		return displayStr;
	}
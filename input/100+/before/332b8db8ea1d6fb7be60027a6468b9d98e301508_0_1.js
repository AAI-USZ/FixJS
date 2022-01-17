function (from, to) {
		var fromParts = exports.normalize(from).split("/"),
			toParts = exports.normalize(to).split("/");

		var length = Math.min(fromParts.length, toParts.length),
			samePartsLength = length;

		for ( var i = 0; i < length; i++)
			if (fromParts[i] != toParts[i]) {
				samePartsLength = i;

				break;
			}

		var outputParts = [];

		for ( var i = samePartsLength; i < fromParts.length; i++)
			outputParts.push("..");

		outputParts = outputParts.concat(toParts.slice(samePartsLength));

		return outputParts.join("/");
	}
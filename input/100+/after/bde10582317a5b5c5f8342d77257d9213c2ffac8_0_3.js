function findLastCommonTokenIndex(brokenString, maxLength) {
		var lastCommonToken = -1;
		for (var i = 0; i < brokenString.length && i < maxLength; ++i) {
			var c = brokenString[i];
			if (c == '.' || c == ' ' || c == ',')
				lastCommonToken = i;
		}
		return lastCommonToken;
	}
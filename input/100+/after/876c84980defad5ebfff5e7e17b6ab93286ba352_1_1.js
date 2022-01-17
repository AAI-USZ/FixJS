function GetAlphabeticalUrls(prefix, suffix, startString, endString, groupNumber) {
		var retUrls = [],
			startNumber = ret.ConvertCharToInt(startString),
			endNumber = ret.ConvertCharToInt(endString);

		while(startNumber <= endNumber) {
			var thisNumString = ret.ConvertIntToChar(startNumber),
				link = prefix + thisNumString + suffix;

			if(groupRegex.test(link)) {
				link = link.replace(new RegExp("\\\{" + groupNumber + "\\\}", 'g'), thisNumString);
			}

			if(ret.IsFuskable(link)) {
				var links = ret.GetLinks(link, groupNumber+1);
				for(var i = 0; i < links.length; i++) {
					retUrls.push(links[i]);
				}
			} else {
				retUrls.push(link);
			}

			startNumber++;
		}

		return retUrls;
	}
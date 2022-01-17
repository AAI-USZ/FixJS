function GetUrls(prefix, suffix, startNumString, endNumString, groupNumber) {
		var retUrls = [],
			startNumber = parseInt(startNumString, 10),
			endNumber = parseInt(endNumString, 10),
			paddedLength = startNumString.length;

			while(startNumber <= endNumber) {
			var thisNumString = PadString(startNumber, paddedLength, "0"),
				link = prefix + thisNumString + suffix;

			if(groupRegex.test(link)) {
				link = link.replace(new RegExp("\\\{"+groupNumber+"\\\}", 'g'), thisNumString);
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
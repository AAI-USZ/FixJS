function() {
			var i,
				lineStartIndex = 0,
				currentIndex = 0,
				currentTabIndex,
				text = Locale._getString(this.textid, this.text);

			// Handle null, undefined, etc edge case
			if (text === void 0) {
				return "";
			}
			text += "";

			// Convert \t and \n to &nbsp;'s and <br/>'s
			while (currentIndex < text.length) {
				if (text[currentIndex] === '\t') {
					var tabSpaces = "",
						numSpacesToInsert = tabStop - (currentTabIndex) % tabStop;
					for (i = 0; i < numSpacesToInsert; i++) {
						tabSpaces += "&nbsp;";
					}
					text = text.substring(0, currentIndex) + tabSpaces + text.substring(currentIndex + 1);
					currentIndex += tabSpaces.length;
					currentTabIndex += numSpacesToInsert;
				} else if (text[currentIndex] === '\n') {
					text = text.substring(0, currentIndex) + "<br/>" + text.substring(currentIndex + 1);
					currentIndex += 5;
					lineStartIndex = currentIndex;
					currentTabIndex = 0;
				} else {
					currentIndex++;
					currentTabIndex++;
				}
			}

			text.match(/<br\/>$/) && (text += "&nbsp;");
			return text;
		}
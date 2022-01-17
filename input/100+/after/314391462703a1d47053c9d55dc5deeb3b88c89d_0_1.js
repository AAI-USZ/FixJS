function(str) {

		if ( !( this.query.selectionEnd == this.query.selectionStart ) )
			return false;

		var inPutString = this.query.value;
		var position = this.query.selectionEnd;
		var valueTab = splitString(inPutString, position);
		var leftContext = valueTab[0];
		var activeWord = valueTab[1];
		var rightContext = valueTab[2];
		var startWord = leftContext.length;
		var endWord = startWord + activeWord.length;

		var obj = this;
		var expand = function (str) {
			obj.replace(startWord, endWord, str);
			var newPosition = startWord + str.length;
			obj.query.setSelectionRange(newPosition, newPosition);
		}
		var expandToClosest = function () {
			return false;
		}
		var showComps = function (list) {

			var output = "";
			for ( var i=0; i<list.length; i++ ) {
				output += list[i] + "<br>";
			}

			obj.autoCompOut.innerHTML = output;

		}
		

		if ( lastMatches ) {
			if ( lastMatches.length <= lastIndex )
				lastIndex = 0;
			expand(lastMatches[lastIndex]);
			lastIndex++;
		} else {

			matches = this.completor(activeWord);

			if ( matches.length == 0 ){
				return false;
			} else if ( matches.length == 1 ) {
				expand(matches[0]);
			} else {
				lastMatches = matches;
				expandToClosest();
				showComps(matches);
			}

		}
	}
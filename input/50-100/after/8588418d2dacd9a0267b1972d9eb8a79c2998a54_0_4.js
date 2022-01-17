function(openChars, closeChars) {
			var delimChars = oldJsvDelimiters.apply(oldJsvDelimiters, arguments);
			delimOpenChar0 = delimChars[0];
			delimOpenChar1 = delimChars[1];
			delimCloseChar0 = delimChars[2];
			delimCloseChar1 = delimChars[3];
			rTag = new RegExp("(?:^|\\s*)([\\w-]*)(" + delimOpenChar1 + $views.rTag + ")" + delimCloseChar0 + ")", "g");
			return this;
		}
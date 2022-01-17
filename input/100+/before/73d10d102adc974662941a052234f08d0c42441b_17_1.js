function (input) {
		var supportedTags = [ 'b', 'i', 'u', 'sup', 'sub' ],
			invisibleTags = [ 'p', 'span', 'div', 'second-field-align' ]; // we want the contents of these but not the actual tags

		input = CSLEDIT.xmlUtility.stripComments(input);
		input = CSLEDIT.xmlUtility.stripUnsupportedTagsAndContents(
			input, supportedTags.concat(invisibleTags));
		input = CSLEDIT.xmlUtility.stripUnsupportedTags(input, supportedTags);
		input = CSLEDIT.xmlUtility.stripAttributesFromTags(input, supportedTags);
		input = input.replace(/&nbsp;/g, " ");
		input = input.replace("\n", "");

		return input;
	}
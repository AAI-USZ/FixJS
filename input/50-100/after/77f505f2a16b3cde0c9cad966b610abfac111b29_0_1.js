function($) {
	    if ($) {
	        var parsedTag = $.match(/^(\S+)(:?\s+(\S[\s\S]*))?/);
            
            if (parsedTag) {
                // we don't need parsedTag[0]
                tagTitle = parsedTag[1];
                tagText = parsedTag[2];

                if (tagTitle) {
                    tagSrcs.push({
                        title: tagTitle,
                        text: tagText
                    });
                }
            }
        }
	}
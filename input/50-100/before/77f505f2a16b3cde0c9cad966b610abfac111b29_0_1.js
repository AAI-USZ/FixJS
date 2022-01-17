function($) {
	    if ($) {
	        var parsedTag = $.match(/^(\S+)(:?\s+(\S[\s\S]*))?/);
            
            if (parsedTag) {
                var [, tagTitle, tagText] = parsedTag;

                if (tagTitle) {
                    tagSrcs.push({
                        title: tagTitle,
                        text: tagText
                    });
                }
            }
        }
	}
function(matchStr, bbcodeLevel, tagName, tagParams, tagContents) {
    
        var processedContent = tags[tagName].noParse ? unprocess(tagContents) : tagContents.replace(bbRegExp, replaceFunct),
            openTag = tags[tagName].openTag(tagParams,processedContent),
            closeTag = tags[tagName].closeTag(tagParams,processedContent);
            
        if ( tags[tagName].displayContent === false) {
            processedContent = "";
        }
        
        return openTag + processedContent + closeTag;
    }
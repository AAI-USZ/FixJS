function checkParentChildRestrictions(parentTag, bbcode, bbcodeLevel, tagName, tagParams, tagContents, errQueue) {
        
        errQueue = errQueue || [];
        bbcodeLevel++;
        
        // get a list of all of the child tags to this tag
        var reTagNames = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])","gi"),
            reTagNamesParts = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])","i"),
            matchingTags = tagContents.match(reTagNames) || [],
            cInfo,
            errStr,
            ii,
            childTag,
            pInfo = tags[parentTag] || {};
        
        reTagNames.lastIndex = 0;
        
        if (!matchingTags) {
            tagContents = "";
        }
        
        for (ii = 0; ii < matchingTags.length; ii++) {
            reTagNamesParts.lastIndex = 0;
            childTag = (matchingTags[ii].match(reTagNamesParts))[2];
            
            if ( pInfo.restrictChildrenTo.length > 0 ) {
                if ( !pInfo.validChildLookup[childTag] ) {
                    errStr = "The tag \"" + childTag + "\" is not allowed as a child of the tag \"" + parentTag + "\".";
                    errQueue.push(errStr);
                }
            }
            cInfo = tags[childTag] || {};
            if ( cInfo.restrictParentsTo.length > 0 ) {
                if ( !cInfo.validParentLookup[parentTag] ) {
                    errStr = "The tag \"" + parentTag + "\" is not allowed as a parent of the tag \"" + childTag + "\".";
                    errQueue.push(errStr);
                }
            }
            
        }
        
        tagContents = tagContents.replace(bbRegExp, function(matchStr, bbcodeLevel, tagName, tagParams, tagContents ) {
            errQueue = checkParentChildRestrictions(tagName, matchStr, bbcodeLevel, tagName, tagParams, tagContents, errQueue);
            return matchStr;
        });
        return errQueue;
    }
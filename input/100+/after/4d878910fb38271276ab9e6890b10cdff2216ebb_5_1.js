function getTagInfo(editor, constPos) {
        //we're going to changing pos a lot, but we don't want to mess up
        //the pos the caller passed in so we use extend to make a safe copy of it.	
        //This is what pass by value in c++ would do.	
        var pos = $.extend({}, constPos),
            ctx = _getInitialContext(editor._codeMirror, pos),
            offset = _offsetInToken(ctx),
            tagInfo,
            tokenType;
        
        //check and see where we are in the tag
        if (ctx.token.string.length > 0 && ctx.token.string.trim().length === 0) {

            // token at (i.e. before) pos is whitespace, so test token at next pos
            //
            // note: getTokenAt() does range checking for ch. If it detects that ch is past
            // EOL, it uses EOL, same token is returned, and the following condition fails,
            // so we don't need to worry about testPos being valid.
            var testPos = {ch: ctx.pos.ch + 1, line: ctx.pos.line},
                testToken = editor._codeMirror.getTokenAt(testPos);

            if (testToken.string.length > 0 && testToken.string.trim().length > 0) {
                // pos has whitespace before it and non-whitespace after it, so use token after
                ctx.pos = testPos;
                ctx.token = testToken;
                // Get the new offset from test token and subtract one for testPos adjustment
                offset = _offsetInToken(ctx) - 1;
            } else {
                // next, see what's before pos
                if (!_movePrevToken(ctx)) {
                    return createTagInfo();
                }
            
                if (ctx.token.className !== "tag") {
                    //if wasn't the tag name, assume it was an attr value
                    tagInfo = _getTagInfoStartingFromAttrValue(ctx);
                    //We don't want to give context for the previous attr
                    //and we want it to look like the user is going to add a new attr
                    if (tagInfo.tagName) {
                        return createTagInfo(ATTR_NAME, 0, tagInfo.tagName);
                    }
                    return createTagInfo();
                }
                
                //we know the tag was here, so they user is adding an attr name
                tokenType = ATTR_NAME;
                offset = 0;
            }
        }
        
        if (ctx.token.className === "tag") {
            //check to see if this is the closing of a tag (either the start or end)
            if (ctx.token.string === ">" ||
                    (ctx.token.string.charAt(0) === "<" && ctx.token.string.charAt(1) === "/")) {
                return createTagInfo();
            }
            
            if (!tokenType) {
                tokenType = TAG_NAME;
                offset--; //need to take off 1 for the leading "<"
            }
            
            //we're actually in the tag, just return that as we have no relevant 
            //info about what attr is selected
            return createTagInfo(tokenType, offset, _extractTagName(ctx));
        }
        
        if (ctx.token.string === "=") {
            //we could be between the attr and the value
            //step back and check
            if (!_moveSkippingWhitespace(_movePrevToken, ctx) || ctx.token.className !== "attribute") {
                return createTagInfo();
            }
            
            //The "=" is added, time to hint for values
            tokenType = ATTR_VALUE;
            offset = 0;
        }
        
        if (ctx.token.className === "attribute") {
            tagInfo = _getTagInfoStartingFromAttrName(ctx);
        } else {
            // if we're not at a tag, "=", or attribute name, assume we're in the value
            tagInfo = _getTagInfoStartingFromAttrValue(ctx);
        }
        
        if (tokenType && tagInfo.tagName) {
            tagInfo.position.tokenType = tokenType;
            tagInfo.position.offset = offset;
        }
        
        return tagInfo;
    }
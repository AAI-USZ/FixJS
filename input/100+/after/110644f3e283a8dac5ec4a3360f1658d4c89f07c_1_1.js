function(tagTitle, tagBody, meta) {
    var tagDef = jsdoc.tag.dictionary.lookUp(tagTitle),
        meta = meta  || {};
    
    this.originalTitle = trim(tagTitle);
    
    /** The title part of the tag: @title text */
    this.title = jsdoc.tag.dictionary.normalise( this.originalTitle );
    
    /** The text part of the tag: @title text */
    this.text = trim(tagBody, tagDef.keepsWhitespace);
    
    if (this.text) {
        
        if (tagDef.onTagText) {
            this.text = tagDef.onTagText(this.text);
        }
        
        if (tagDef.canHaveType) {
        
            /** The value property represents the result of parsing the tag text. */
            this.value = {};
            
            var tagType = jsdoc.tag.type.parse(this.text);

            if (tagType.type && tagType.type.length) {
                this.value.type = {
                    names:    tagType.type,
                    optional: tagType.optional,
                    nullable: tagType.nullable,
                    variable: tagType.variable
                };
            }

            var remainingText = tagType.text;

            if (remainingText) {
                if (tagDef.canHaveName) {
                    var paramInfo = parseParamText(remainingText);
                    
                    // note the dash is a special case: as a param name it means "no name"
                    if (paramInfo.name && paramInfo.name !== '-') { this.value.name = paramInfo.name; }
                    
                    if (paramInfo.desc)     { this.value.description = paramInfo.desc; }
                    if (paramInfo.optional) { this.value.optional = paramInfo.optional; }
                    if (paramInfo.default)  { this.value.defaultvalue = paramInfo.default; }
                }
                else {
                    this.value.description = remainingText;
                }
            }
        }
        else {
            this.value = this.text;
        }
    }
    
    // validate the tag. in lenient mode, log a warning; otherwise, throw an exception.
    try {
        jsdoc.tag.validator.validate(this, meta);
    }
    catch (e) {
        if (env.opts.lenient) {
            console.log(e);
        } else {
            throw e;
        }
    }
}
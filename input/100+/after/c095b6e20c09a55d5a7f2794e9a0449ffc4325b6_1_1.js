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
            
            var [
                /*Array.<string>*/ typeNames,
                /*any*/ remainingText,
                /*?boolean*/ optional,
                /*?boolean*/ nullable,
                /*?boolean*/ variable
            ] = jsdoc.tag.type.parse(this.text);

            if (typeNames.length) {
                this.value.type = {
                    names:    typeNames,
                    optional: optional,
                    nullable: nullable,
                    variable: variable
                };
            }

            if (remainingText) {
                if (tagDef.canHaveName) {
                    var [paramName, paramDesc, paramOptional, paramDefault]
                        = parseParamText(remainingText);
                    
                    // note the dash is a special case: as a param name it means "no name"
                    if (paramName && paramName !== '-') { this.value.name = paramName; }
                    
                    if (paramDesc)     { this.value.description = paramDesc; }
                    if (paramOptional) { this.value.optional = paramOptional; }
                    if (paramDefault)  { this.value.defaultvalue = paramDefault; }
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
    
    // validate the tag. for strict validation, throw an exception; otherwise, log a warning.
    try {
        jsdoc.tag.validator.validate(this, meta);
    }
    catch (e) {
        if (env.opts.strict) {
            throw e;
        } else {
            console.log(e);
        }
    }
}
function() {
        //return [this.beginTag, this.endTag, this.text, this.nodeType, this.id];
        return {
            beginTag    : this.beginTag,
            endTag      : this.endTag,
            text        : this.text,
            nodeType    : this.nodeType
        };
    }
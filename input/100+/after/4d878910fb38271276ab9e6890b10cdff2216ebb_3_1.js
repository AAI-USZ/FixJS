function () {
        var pos = this.editor.getCursorPos(),
            tagInfo = HTMLUtils.getTagInfo(this.editor, pos);
        
        this.query = null;
        if (tagInfo.position.tokenType === HTMLUtils.TAG_NAME) {
            if (tagInfo.position.offset >= 0) {
                this.query = tagInfo.tagName.slice(0, tagInfo.position.offset);
            }
        }
    }
function () {
        var pos = this.editor.getCursorPos(),
            cursor = this.editor.indexFromPos(pos),
            tagInfo = HTMLUtils.getTagInfo(this.editor, pos);

        if (tagInfo.position.tokenType === HTMLUtils.TAG_NAME) {
            var text = this.editor.document.getText(),
                start = text.lastIndexOf("<", cursor) + 1;
            if (start < cursor) {
                this.query = text.slice(start, cursor);
            } else {
                this.query = null;
            }
        } else {
            this.query = null;
        }
    }
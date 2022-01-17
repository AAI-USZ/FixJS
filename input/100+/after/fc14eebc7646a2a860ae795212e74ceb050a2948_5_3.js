function() {
            query("> .tool", this.domNode).remove();

            this.onContentChange();
        }
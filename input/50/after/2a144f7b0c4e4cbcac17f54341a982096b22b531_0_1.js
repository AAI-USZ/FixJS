function() {
        return (this.editor === this.source) ?
            this.$editorTextarea.innerHeight() :
            this.$editorIframe.outerHeight();
    }
function(shouldHighlight) {
        if (this.$highlightGutterLine == shouldHighlight)
            return;
        this.$highlightGutterLine = shouldHighlight;
        
        
        if (!this.$gutterLineHighlight) {
            this.$gutterLineHighlight = dom.createElement("div");
            this.$gutterLineHighlight.className = "ace_gutter_active_line";
            this.$gutter.appendChild(this.$gutterLineHighlight);
            return;
        }

        this.$gutterLineHighlight.style.display = shouldHighlight ? "" : "none";
        this.$updateGutterLineHighlight();
    }
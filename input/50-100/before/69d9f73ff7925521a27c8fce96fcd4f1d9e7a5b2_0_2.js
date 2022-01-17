function(width) {
            this.uiChatboxTitlebar.width(width + "px");
            this.uiChatboxLog.width(width + "px");
            // this is a hack, but i can live with it so far
            this.uiChatboxInputBox.css("width", (width - 14) + "px");
        }
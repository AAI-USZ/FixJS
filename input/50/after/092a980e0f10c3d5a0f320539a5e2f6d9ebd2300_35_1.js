function InlineWidget() {
        // create the outer wrapper div
        this.htmlContent = window.document.createElement("div");
        this.$htmlContent = $(this.htmlContent).addClass("inline-widget");
        this.$htmlContent.append("<div class='shadow top' />")
            .append("<div class='shadow bottom' />");
    }
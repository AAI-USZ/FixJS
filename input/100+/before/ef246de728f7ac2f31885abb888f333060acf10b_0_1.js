function() {
        this.hasFocus = false;

        var self = this;
        ORBEON.xforms.Events.runOnNext(ORBEON.xforms.Events.ajaxResponseProcessedEvent, function() {
            // Update visible field
            self.update();
            // Update xforms-invalid-visited
            if (YAHOO.util.Dom.hasClass(self.container, "xforms-invalid"))
                YAHOO.util.Dom.addClass(self.container, "xforms-invalid-visited");
        });

        var newValue = this.visibleInputElement.value;
        ORBEON.xforms.Document.setValue(this.xformsInputElement.id, newValue);

        // Make sure the field is known as visited
        ORBEON.xforms.Controls.updateInvalidVisitedOnNextAjaxResponse(this.container);
    }
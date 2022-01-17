function() {
        this.hasFocus = false;
        var newValue = this.visibleInputElement.value;
        ORBEON.xforms.Document.setValue(this.xformsInputElement.id, newValue);
    }
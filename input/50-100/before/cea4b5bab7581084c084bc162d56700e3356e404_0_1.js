function(silent) {
    if (this.dom.field && this.fieldEditable) {
        this.fieldHTML = this.dom.field.innerHTML;
    }

    if (this.fieldHTML != undefined) {
        try {
            this.field = this._unescape(this._stripHTML(this.fieldHTML));
        }
        catch (err) {
            this.field = undefined;
            if (silent != true) {
                throw err;
            }
        }
    }
}
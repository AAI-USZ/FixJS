function() {
        var value = this.value();
        var encodedValue = value.htmlEncode();

        var dirty = (this._normalizeText(this._initialValue) != encodedValue);

        if (dirty) {
            this.element.html($.isFunction(this.options.formatResult)
                              ? this.options.formatResult(encodedValue)
                              : encodedValue);
            this._initialValue = this.element.text();
        }

        if (dirty || this.options.notifyUnchangedCompletion) {
            this.element.triggerHandler("complete",
                                        [value, this._initialValue]);
        }
    }
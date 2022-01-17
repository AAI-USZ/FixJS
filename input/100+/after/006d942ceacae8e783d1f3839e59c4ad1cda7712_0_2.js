function() {
        var value = this.value();
        var encodedValue = value.htmlEncode();

        if (this._dirty) {
            this.element.html($.isFunction(this.options.formatResult)
                              ? this.options.formatResult(encodedValue)
                              : encodedValue);
            this._initialValue = this.element.text();
        }

        if (this._dirty || this.options.notifyUnchangedCompletion) {
            this.element.triggerHandler("complete",
                                        [value, this._initialValue]);
        }
    }
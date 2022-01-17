function (data) {
            if (data && !this.options.disabled) {
                data.files = $.each($.makeArray(data.files), this._normalizeFile);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }
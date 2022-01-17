function (data) {
            if (!data || this.options.disabled) {
                return;
            }
            data.files = $.each($.makeArray(data.files), this._normalizeFile);
            this._onAdd(null, data);
        }
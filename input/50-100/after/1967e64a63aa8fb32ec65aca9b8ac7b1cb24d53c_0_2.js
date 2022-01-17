function (data) {
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                data.files = this._getFileInputFiles(data.fileInput);
            } else {
                data.files = $.each($.makeArray(data.files), this._normalizeFile);
            }
            this._onAdd(null, data);
        }
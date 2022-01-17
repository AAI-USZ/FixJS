function (fileInput) {
            fileInput = $(fileInput);
            var files = $.each($.makeArray(fileInput.prop('files')), this._normalizeFile),
                value;
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return [];
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            }
            return files;
        }
function (fileType, container, success, error) {
                var input, mimeType;
                container = container || $('body');
                mimeType = fsUtils.fileTypes[fileType.toLowerCase()].mime;
                input = $('<input type="file" accept="' + mimeType +'"/>')
                        .addClass('hidden-accessible').appendTo(container);
                input.change(function (e) {
                    var file;
                    if (e.currentTarget.files.length === 1) {
                        file = e.currentTarget.files[0];
                        if (fsUtils.checkFileType(fileType, file)) {
                            success && success(file)
                        } else {
                            console.warn("Unexpected uploaded file.");
                            // TODO: confirm with user if still use the file
                            error && error();
                        }
                    } else {
                        if (e.currentTarget.files.length <= 1) {
                            console.warn("No files specified to import");
                        } else {
                            console.warn("Multiple file import not supported");
                        }
                        error && error();
                    }
                    // remove the temp input element
                    input.remove();
                });
                input.click();
            }
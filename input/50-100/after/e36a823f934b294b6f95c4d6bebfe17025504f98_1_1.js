function (newValue) {
                    var editor = editorGetFn(editField);
                    if (!editor) {
                        if (newValue !== undefined) {
                            $(editField).val(newValue);
                        }
                        return "";
                    }
                    if (newValue !== undefined) {
                        setValueFn(editField, editor, newValue);
                    } else {
                        return getValueFn(editor);
                    }
                }
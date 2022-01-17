function checkGeneratedField(field, id, title, startIndex, classes, opts, required) {
        var
            divId = "je0-" + id + "-" + startIndex,
            inputId = "je0-" + id + "-input-" + (startIndex + 1),
            input = priv.input(id, opts.type, inputId, opts, required);

        delete input.input.$keyup;

        deepEqual(field, {
            "div": {
                "id": divId,
                "class": classes,
                "$childs": [
                    // this should be tested separetely so we trust they work
                    priv.label(title, inputId),
                    input
                ]
            }
        });
    }
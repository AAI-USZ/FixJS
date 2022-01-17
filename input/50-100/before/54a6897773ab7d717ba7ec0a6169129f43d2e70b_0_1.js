function checkGeneratedField(field, id, title, startIndex, classes, opts, required) {
        var
            divId = "je-" + id + "-" + startIndex,
            inputId = "je-" + id + "-input-" + (startIndex + 1);

        deepEqual(field, {
            "div": {
                "id": divId,
                "class": classes,
                "$childs": [
                    // this should be tested separetely so we trust they work
                    priv.label(title, inputId),
                    priv.input(id, opts.type, inputId, opts, required)
                ]
            }
        });
    }
function _openInlineWidget(editor) {
        PerfUtils.markStart(PerfUtils.OPEN_INLINE_EDITOR);
        
        // Run through inline-editor providers until one responds
        var pos = editor.getCursorPos(),
            inlinePromise,
            i,
            result = new $.Deferred();
        
        for (i = 0; i < _inlineEditProviders.length && !inlinePromise; i++) {
            var provider = _inlineEditProviders[i];
            inlinePromise = provider(editor, pos);
        }
        
        // If one of them will provide a widget, show it inline once ready
        if (inlinePromise) {
            inlinePromise.done(function (inlineWidget) {
                editor.addInlineWidget(pos, inlineWidget);
                PerfUtils.addMeasurement(PerfUtils.OPEN_INLINE_EDITOR);
                result.resolve();
            }).fail(function () {
                result.reject();
            });
        } else {
            result.reject();
        }
        
        return result.promise();
    }
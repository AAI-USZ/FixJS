function(ed) {
        var adapter = this;

        adapter.tinymce = adapter.editor = ed;
        adapter.source =
            new MT.Editor.Source(adapter.$editorTextarea.attr('id'));
        adapter.proxies = {
            source: new MT.EditorCommand.Source(adapter.source),
            wysiwyg: new MT.EditorCommand.WYSIWYG(adapter)
        };

        ed.execCommand('mtSetProxies', adapter.proxies, null, {skip_focus: true});

        if (ed.getContent() == '') {
            // Browser compatibility
            // Set the "formatselect" to default value for empty content.
            var formatselect;
            if (formatselect = ed.controlManager.get('formatselect')) {
                setTimeout(function() {
                    formatselect.select('');
                }, 0);
            }
        }

        var resizeTo = ed.theme.resizeTo;
        ed.theme.resizeTo = function(width, height, store, isFullscreen) {
            if (isFullscreen) {
                adapter.$editorTextarea.height(height);
            }
            else {
                var base = adapter.$editorTextarea.data('base-height');
                if (base) {
                    adapter.$editorTextarea.height(base+height);
                    if (store) {
                        adapter.$editorTextarea
                            .data('base-height', base+height);
                    }
                }
            }
            resizeTo.apply(ed.theme, arguments);
        };

        $('#' + adapter.id + '_tbl').css({
            width: '100%'
        });

        adapter.$editorIframe = $('#' + adapter.id + '_ifr');
        adapter.$editorElement = adapter.$editorIframe;
        adapter.$editorPathRow = $('#' + adapter.id + '_path_row');

        var save = ed.save;
        ed.save = function () {
            if (! ed.isHidden()) {
                save.apply(ed, arguments);
            }
        }

        $([
            'onSetContent', 'onKeyDown', 'onReset', 'onPaste',
            'onUndo', 'onRedo'
        ]).each(function() {
            var ev = this;
            ed[ev].add(function() {
                if (! adapter.tinymce.isDirty()) {
                    return;
                }
                adapter.tinymce.isNotDirty = 1;

                adapter.setDirty({
                    target: adapter.$editorTextarea.get(0)
                });
            });
        });

        ed.addCommand('mtSetFormat', function(format) {
            adapter.manager.setFormat(format);
        });

        ed.addCommand('mtGetEditorSize', function() {
            return {
                iframeHeight: adapter.$editorIframe.height(),
                textareaHeight: adapter.$editorTextarea.height()
            };
        });

        ed.addCommand('mtRestoreEditorSize', function(size) {
            adapter.$editorIframe.height(size['iframeHeight']);
            adapter.$editorTextarea.height(size['textareaHeight']);
        });
    }
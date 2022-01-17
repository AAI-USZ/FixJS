function (that) {

        var makeButtons = function (editor) {
                $(that.options.selectors.editorSaveButton, editor.container).click(function () {
                    editor.finish();
                    return false;
                });

                $(that.options.selectors.editorCancelButton, editor.container).click(function () {
                    editor.cancel();
                    return false;
                });
            },
        // Create a TinyMCE-based Rich Inline Edit component.
            tinyEditor = fluid.inlineEdit.tinyMCE(that.container, {
                tinyMCE: {
                    width: that.options.width,
                    height: that.options.height,
                    theme: 'advanced',
                    theme_advanced_toolbar_location : 'top'
                },
                strings: {
                    // TODO - to hide edit button placed just above the editing region
                    textEditButton: ''
                },
                listeners: {
                    onBeginEdit: function () {
                        // disable edit button
                        that.locate('editActivationButton').attr('disabled', 'disabled');
                        /*
                         A workaround for TinyMCE issue
                         Details - TinyMCE select all visible elements and make them available for editing
                         irrespective of the fact that some ancestor of element might be hidden.
                         */
                        that.locate('chapterContent').find(':hidden').each(function () {
                            $(this).find('*').hide();
                        });
                        // Initialize TinyMCE editor with updated chapter content
                        tinyEditor.updateModelValue(that.locate('chapterContent').html(), null);
                    },
                    afterInitEdit: function (editor) {
                        // Apply current chapter styles to TinyMCE editor
                        editor.dom.addClass(editor.dom.select('body'), that.options.selectors.chapterStyleElement.slice(1));
                        editor.dom.add(editor.dom.select('head'), 'style', {type: 'text/css'}, that.locate('chapterStyle').find('style').text());
                    },
                    afterFinishEdit: function (newValue, oldValue, editNode, viewNode) {
                        // enable edit button
                        that.locate('editActivationButton').removeAttr('disabled');
                    }
                },
                useTooltip: false
            });
        makeButtons(tinyEditor);

        that.attachEditor = function () {
            tinyEditor.edit();
        };
        /* Attach click handler for custom edit button */
        that.locate('editActivationButton').click(function () {
            that.attachEditor();
        });
    }
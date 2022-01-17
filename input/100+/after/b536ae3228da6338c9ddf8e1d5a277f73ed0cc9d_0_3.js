function (that) {

        var bookmarkKeyboardHandler =  function (e) {
            var code = e.keyCode || e.which;
            if (code  === 66 && e.shiftKey) {
                // prevent input texbox to be filled with B
                e.preventDefault();
                that.addBookmarkHandler();
            }
        },
            notesKeyboardHandler =  function (e) {
                var code = e.keyCode || e.which;
                if (code  === 78 && e.shiftKey) {
                    // prevent input texbox to be filled with N
                    e.preventDefault();
                    that.addNoteHandler();
                }
            };

        // keyboard accessibility for reading region
        that.locate('bookContainer').fluid('tabbable');
        //  add bookmark button click event
        that.locate('addBookmarkButton').click(function (evt) {
            that.addBookmarkHandler();
        });
        // notes add button
        that.locate('addNoteButton').click(function (evt) {
            that.addNoteHandler();
        });
        // shift + keys for navigation and edit
        that.locate('bookContainer').bind('keydown', function (e) {
            var code = e.keyCode || e.which;
            if (code  === 40 && e.shiftKey) {
                that.navigator.next();
            }
            if (code  === 38 && e.shiftKey) {
                that.navigator.previous();
            }
            if (code  === 39 && e.shiftKey) {
                that.navigator.next_chapter();
            }
            if (code  === 37 && e.shiftKey) {
                that.navigator.previous_chapter();
            }
            if (code  === 69 && e.shiftKey) {
                that.editor.attachEditor();
            }
        });
        // next button event for navigation
        that.locate('nextButton').click(function (evt) {
            that.navigator.next();
        });
        // previous button event for navigation
        that.locate('previousButton').click(function (evt) {
            that.navigator.previous();
        });
        // next chapter button event for navigation
        that.locate('nextChapterButton').click(function (evt) {
            that.navigator.next_chapter();
        });
        //previous chapter button event for navigation
        that.locate('previousChapterButton').click(function (evt) {
            that.navigator.previous_chapter();
        });
        // autofocus on book container
        that.locate('bookContainer').focus(function () {
            $('html, body').animate({ scrollTop: $(this).offset().top }, 500);
        });

        // to activate individual elements
        that.locate('bookContainer').fluid('activatable',  function (evt) {
            that.locate('bookContainer').fluid('selectable', {
                selectableSelector: that.options.selectors.chapterContent + ' :visible',
                onSelect: function (evt) {
                    that.locate('bookContainer').find(evt).bind('keydown', bookmarkKeyboardHandler);
                    that.locate('bookContainer').find(evt).bind('keydown', notesKeyboardHandler);
                },
                onUnselect: function (evt) {
                    that.locate('bookContainer').find(evt).unbind('keydown', bookmarkKeyboardHandler);
                    that.locate('bookContainer').find(evt).unbind('keydown', notesKeyboardHandler);
                }
            });

        });

        that.addNoteHandler = function () {
            var tempForm = $('<div/>'),
                noteId = $('<input/>').attr('type', 'text'),
                noteText = $('<textarea/>'),
                currentSelectable,
                dialogOffset;
            try {
                currentSelectable = that.locate('bookContainer').fluid('selectable.currentSelection');
            } catch (e) {
                console.log('Caught an exception for invalid note addition');
            }
            if (!currentSelectable) {
                fluid.epubReader.utils.showNotification('Please make a selection for note', 'error');
                return;
            }
            dialogOffset = currentSelectable.offset();
            tempForm.attr('title', 'Enter Note Details');
            tempForm.append(noteId);
            tempForm.append('<br><br>');
            fluid.epubReader.utils.setTitleToolTip(noteId, 'Note Title');
            fluid.epubReader.utils.setTitleToolTip(noteText, 'Note Text');
            tempForm.append(noteText);
            that.container.append(tempForm);

            tempForm.dialog({
                autoOpen: true,
                modal: false,
                draggable: false,
                width: 'auto',
                maxHeight: 400,
                maxWidth: 500,
                resizable: true,
                position: [dialogOffset.left, dialogOffset.top + currentSelectable.height()],
                show: 'slide',
                hide: 'slide',
                buttons: {
                    'Create': function () {
                        var noteIdVal = $.trim(noteId.val()),
                            noteTextVal = $.trim(noteText.val());
                        if (noteIdVal.length === 0 || noteTextVal.length === 0) {
                            fluid.epubReader.utils.showNotification('Incomplete Form', 'error');
                        } else {
                            if (that.navigator.addNote(noteIdVal, noteTextVal, currentSelectable)) {
                                $(this).dialog('close');
                                fluid.epubReader.utils.showNotification('Note Added', 'success');
                            } else {
                                fluid.epubReader.utils.showNotification('Note identifier already exist', 'error');
                            }
                        }
                    },
                    Cancel: function () {
                        $(this).dialog('close');
                    }
                },
                open: function (event, ui) {
                    $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                },
                close: function () {
                    //restore focus back to selection
                    currentSelectable.focus();
                    tempForm.remove();
                }
            });
        };

        that.addBookmarkHandler = function () {
            var tempForm = $('<div/>'),
                inputBox = $('<input/>'),
                currentSelectable,
                dialogOffset;
            try {
                currentSelectable = that.locate('bookContainer').fluid('selectable.currentSelection');
            } catch (e) {
                console.log('Caught an exception for invalid bookmark addition');
            }
            if (!currentSelectable) {
                fluid.epubReader.utils.showNotification('Please make a selection for bookmark', 'error');
                return;
            }
            dialogOffset = currentSelectable.offset();
            tempForm.attr('title', 'Enter Bookmark Identifier');
            inputBox.attr('type', 'text');
            tempForm.append(inputBox);
            that.container.append(tempForm);

            tempForm.dialog({
                autoOpen: true,
                modal: false,
                height: 90,
                width: 240,
                draggable: false,
                resizable: false,
                position: [dialogOffset.left, dialogOffset.top + currentSelectable.height()],
                show: 'slide',
                hide: 'slide',
                buttons: {
                    'Create': function () {
                        var bookmarkId = $.trim($(this).find('input').val());
                        if (bookmarkId.length === 0) {
                            fluid.epubReader.utils.showNotification('Please enter an identifier', 'error');
                        } else {
                            if (that.navigator.addBookmark(bookmarkId, currentSelectable)) {
                                $(this).dialog('close');
                                fluid.epubReader.utils.showNotification('Bookmark Added', 'success');
                            } else {
                                fluid.epubReader.utils.showNotification('This Bookmark identifier already exist', 'error');
                            }
                        }
                    },
                    Cancel: function () {
                        $(this).dialog('close');
                    }
                },
                open: function (event, ui) {
                    $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
                },
                close: function () {
                    //restore focus back to selection
                    currentSelectable.focus();
                    tempForm.remove();
                }
            });
        };
    }
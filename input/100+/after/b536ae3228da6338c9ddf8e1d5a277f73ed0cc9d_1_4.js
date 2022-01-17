function ($, fluid) {

    /* Navigator */

    fluid.defaults('fluid.epubReader.bookHandler.navigator', {
        gradeNames: ['fluid.viewComponent', 'autoInit'],
        components: {
            toc: {
                type: 'fluid.epubReader.bookHandler.navigator.toc',
                container: '{epubReader}.options.selectors.tocContainer'
            },
            bookmarks: {
                type: 'fluid.epubReader.bookHandler.navigator.Bookmarks',
                container: '{epubReader}.options.selectors.bookmarkContainer',
                options: {
                    listeners: {
                        onBookmarkNavigate: '{navigator}.naivagteTo'
                    }
                }
            },
            notes: {
                type: 'fluid.epubReader.bookHandler.navigator.Notes',
                container: '{epubReader}.options.selectors.notesContainer',
                options: {
                    listeners: {
                        afterNotesChange: '{navigator}.afterNotesChangeHandler'
                    }
                }
            }
        },
        constraints: {
            maxImageHeight: '{epubReader}.options.constraints.maxImageHeight',
            maxImageWidth: '{epubReader}.options.constraints.maxImageWidth'
        },
        pageMode: 'split',
        scrollSpeed: 50,
        autoActivate: false,
        selectors: {
            remaining: '{bookHandler}.options.selectors.remaining',
            chapterStyle: '{bookHandler}.options.selectors.chapterStyle',
            chapterContent: '{bookHandler}.options.selectors.chapterContent',
            bookContainer: '{bookHandler}.options.selectors.bookContainer',
            remainingWrapper: '{epubReader}.options.selectors.remainingWrapper'
        },
        events: {
            onUIOptionsUpdate: '{bookHandler}.events.onUIOptionsUpdate',
            onPageModeRestore: '{bookHandler}.events.onPageModeRestore'
        },
        listeners: {
            onUIOptionsUpdate: '{navigator}.requestContentLoad',
            onPageModeRestore: '{navigator}.setPageMode'
        },
        finalInitFunction: 'fluid.epubReader.bookHandler.navigator.finalInit',
        preInitFunction: 'fluid.epubReader.bookHandler.navigator.preInit'
    });

    fluid.epubReader.bookHandler.navigator.preInit = function (that) {
        // To handler UI options setting change
        that.requestContentLoad = function (selection) {
            var newMode = selection.pageMode;
            if (that.options.pageMode === 'scroll' && newMode === 'scroll') {
                return;
            } else if (that.options.pageMode === 'split' && newMode === 'split') {
                that.toc.reloadCurrent();
            } else {
                that.setPageMode(newMode);
                that.toc.reloadCurrent();
            }
        };

        // restoring page mode retrieve using UI Options component
        that.setPageMode = function (newPageMode) {
            that.options.pageMode = newPageMode;
            if (that.options.pageMode === 'split') {
                that.locate('remainingWrapper').show();
                that.locate('chapterContent').css('overflow', 'hidden');
                that.locate('bookContainer').css('overflow-y', 'hidden');
            } else if (that.options.pageMode === 'scroll') {
                that.locate('remainingWrapper').hide();
                that.locate('chapterContent').css('overflow', 'visible');
                that.locate('bookContainer').css('overflow-y', 'auto');
            }
        };
        // for bookmarks
        that.naivagteTo = function (chapterValue, itemOffset) {
            that.toc.setCurrentChapterToValue(chapterValue);
            if (that.options.pageMode === 'scroll') {
                that.locate('bookContainer').scrollTop(itemOffset);
            } else if (that.options.pageMode === 'split') {
                that.splitModeScrollTop(itemOffset);
            }
        };
        // on updating note attach notes to elements in UI
        that.afterNotesChangeHandler = function () {
            that.locate('chapterContent').find(':hidden').show();
            that.removeAllNotes();
            that.attachAllNotes();
            that.selectionWrapper();
        };
    };

    fluid.epubReader.bookHandler.navigator.finalInit = function (that) {
        var current_selection_height = 500,
            current_chapter = {},
            current_selection = {},//= {from : 0, to : current_selection_height};
            pagination = []; // to keep track about forward and backward pagination ranges

        that.splitModeScrollTop =  function (itemOffset) {
            while (!(current_selection.from <= itemOffset && itemOffset <= current_selection.to)) {
                console.log(JSON.stringify(current_selection));
                that.next();
            }
            /*  TODO - To be removed after editing API completion
            if (!that.isSelected(itemOffset)) {
                that.next();
            }
            */
        };

        that.isSelected = function (itemOffset) {
            console.log(itemOffset);
            var reqOffset = that.locate('chapterContent').offset().top + itemOffset,
                ret = false;
            console.log(reqOffset + " req");
            that.locate('chapterContent').find(':visible').each(function () {
                var elm = $(this);
                console.log(elm);
                console.log(elm.offset().top - that.locate('chapterContent').offset().top);
                if (elm.offset().top === reqOffset) {
                    ret = true;
                }
            });
            return ret;
        };

        that.selectionWrapper = function () {
            // removing tabindex for hidden elements
            /* TODO not working properly for notes - fix in editing part */
            that.locate('bookContainer').find('*').removeAttr('tabindex');
            if (that.options.pageMode === 'split') {
                that.locate('chapterContent').find(':hidden').show();
                var toHide = [],
                    ret = that.createSelection(that.locate('chapterContent').children().first(), toHide, that.locate('chapterContent').offset().top),
                    i = 0;
                for (i = 0; i < toHide.length; i = i + 1) {
                    toHide[i].hide();
                }
                that.updateProgressbar();
                if (that.options.autoActivate) {
                     that.locate('bookContainer').fluid('activate');
                }
                that.locate('bookContainer').focus();
                return ret;
            } else if (that.options.pageMode === 'scroll') {
                if (that.options.autoActivate) {
                    that.locate('bookContainer').fluid('activate');
                }
                that.locate('bookContainer').focus();
                return true;
            }
        };

        that.updateProgressbar = function () {
            var progress = 500 * ((current_selection.to > current_chapter.height) ? 1 : (current_selection.to / current_chapter.height));
            that.locate('remaining').css('width', progress + 'px');
        };

        that.createSelection = function (node, toHide, offsetCorrection) {
            if (!node) {
                return null;
            }
            var top = node.offset().top - offsetCorrection,
                bottom = top + node.height(),
                ret = false,
                kid;
            if (current_selection.to <= top || current_selection.from >= bottom) {
                return false;
            } else if (current_selection.from <= top && current_selection.to >= bottom) {
                return true;
            } else {
                kid = node.children();
                kid.each(function () {
                    var temp = that.createSelection($(this), toHide, offsetCorrection);
                    if (temp === true) {
                        ret = true;
                    } else {
                        toHide.push($(this));
                    }
                });
                // overflow test expression ( (node.is('img') || !node.text() ) && current_selection.to >= top && current_selection.to <= bottom )
                if ((node.is('img') || (kid.length === 0 && node.text() !== '')) && current_selection.from >= top && current_selection.from <= bottom) {
                    current_selection.from = top;
                    current_selection.to = current_selection.from + current_selection_height;
                    return true;
                } else {
                    return ret;
                }
            }
        };

        that.resetSelection = function () {
            current_selection.from = 0;
            current_selection.to = current_selection.from + current_selection_height;
        };

        that.load_content = function (chapter_content) {
            console.log('new chapter');
            current_chapter = chapter_content;
            pagination = [];
            var chapterElem = that.locate('chapterContent');

            that.resetSelection();
            chapterElem.html(current_chapter.content);
            that.locate('chapterStyle').html(current_chapter.styles);

            chapterElem.find('img').css({
                'max-width': that.options.constraints.maxImageWidth + 'px',
                'max-height': that.options.constraints.maxImageHeight + 'px',
                'height': 'auto',
                'width': 'auto'
            });

            // Wrapping non-element text in <div>
            chapterElem.find('*').each(function () {
                if ($(this).children().length !== 0) {
                    $(this).contents().filter(function () {
                        if (this.nodeType === 3 && $.trim(this.nodeValue) !== '') {
                            return true;
                        }
                        return false;
                    }).wrap('<div/>');
                }
            });

            /*
             waitForImages jQuery Plugin is a being used because of a bug in .load method of jquery
             .load method is not accurate and fails for cached images case.
             We need to calculate height of chapter (including height of images)
             in order to navigate inside the chapter
             */
            chapterElem.waitForImages(function () {
                current_chapter.height = that.getCurrentPageHeight();
                that.attachAllNotes();
                that.selectionWrapper();
                if (that.options.pageMode === 'scroll') {
                    that.locate('bookContainer').scrollTop(0);
                }
            });

            return false;
        };

        that.getCurrentPageHeight = function () {
            var lastChild = that.locate('chapterContent').children().last();
            // calculating height of content
            return lastChild.offset().top + lastChild.height() - that.locate('chapterContent').offset().top;
        };

        that.next = function () {
            if (that.options.pageMode === 'split') {
                // Book keeping for previous page stills
                pagination.push({from: current_selection.from, to: current_selection.to});
                current_selection.from = current_selection.to + 1;
                current_selection.to = current_selection.from + current_selection_height;
                if (current_selection.from < current_chapter.height) {
                    if (that.selectionWrapper() === false) {
                        that.next();
                    }
                } else {
                    that.next_chapter();
                }
            } else if (that.options.pageMode === 'scroll') {
                that.locate('bookContainer').scrollTop(that.locate('bookContainer').scrollTop() + that.options.scrollSpeed);
                // continuous scroll till the end of book
                if ((that.locate('bookContainer')[0].offsetHeight + that.locate('bookContainer').scrollTop()) >= that.locate('bookContainer')[0].scrollHeight) {
                    that.next_chapter();
                }
            }
        };

        that.previous = function () {
            if (that.options.pageMode === 'split') {
                current_selection = pagination.pop();
                if (current_selection !== undefined && current_selection.to > 0) {
                    if (that.selectionWrapper() === false) {
                        that.previous();
                    }
                } else {
                    current_selection = {};
                    that.previous_chapter();
                }
            } else if (that.options.pageMode === 'scroll') {
                that.locate('bookContainer').scrollTop(that.locate('bookContainer').scrollTop() - that.options.scrollSpeed);
                // continous scroll till the beginning  of book
                if (that.locate('bookContainer').scrollTop() <= 0) {
                    current_selection = {};
                    that.previous_chapter();
                    that.locate('bookContainer').scrollTop(that.locate('bookContainer')[0].scrollHeight - that.locate('bookContainer')[0].offsetHeight);
                }
            }
        };

        that.next_chapter = function () {
            if (that.toc.isLast()) {
                return;
            }
            that.toc.setCurrentSelectionToIndex(that.toc.currentSelectPosition() + 1);
        };

        that.previous_chapter = function () {
            if (that.toc.isFirst()) {
                return;
            }
            that.toc.setCurrentSelectionToIndex(that.toc.currentSelectPosition() - 1);
        };

        that.getOffsetOf = function (elm) {
            var ItemOffset;
            if (that.options.pageMode === 'scroll') {
                ItemOffset = elm.offset().top - that.locate('chapterContent').offset().top;
            } else if (that.options.pageMode === 'split') {
                // show everything
                that.locate('chapterContent').find(':hidden').show();
                // get proper Offset
                ItemOffset = elm.offset().top - that.locate('chapterContent').offset().top;
                // restore all hidden elements
                that.selectionWrapper();
            }
            return ItemOffset;
        };

        that.addBookmark = function (bookmarkId, bookmarkSelectable) {
            return that.bookmarks.addBookmark({
                bookmarkId: bookmarkId,
                bookmarkChapter: that.toc.getCurrentChapter(),
                bookmarkedItemHTML: $('<div/>').append(bookmarkSelectable.filter('*').removeAttr('tabindex').clone()).html(),
                bookmarkedItemOffset: that.getOffsetOf(bookmarkSelectable)
            });
        };

        that.addNote = function (noteId, noteText, noteAnchor) {
            return that.notes.addNote({
                noteId: noteId,
                noteChapter: that.toc.getCurrentChapter(),
                notedText: noteText,
                notedItemOffset: that.getOffsetOf(noteAnchor)
            });
        };

        that.attachAllNotes = function () {
            var chapter = that.toc.getCurrentChapter(),
                offsetCorrection = that.locate('chapterContent').offset().top,
                elms,
                offsets = [];
            elms = that.locate('chapterContent').find('*');
            elms.each(function () {
                offsets.push($(this).offset().top - offsetCorrection);
            });
            that.notes.attachNote(chapter.value, elms, offsets);
        };

        that.removeAllNotes = function () {
            that.locate('chapterContent').find('*').removeData('qtip');
        };
    };

}
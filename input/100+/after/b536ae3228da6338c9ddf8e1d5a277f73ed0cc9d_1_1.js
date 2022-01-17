function (that) {
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
    }
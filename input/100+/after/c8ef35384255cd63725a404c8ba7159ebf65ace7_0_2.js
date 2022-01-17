function (chapterValue, itemOffset) {
            that.toc.setCurrentChapterToValue(chapterValue);
            if (that.options.pageMode === 'scroll') {
                that.locate('bookContainer').scrollTop(itemOffset);
            } else if (that.options.pageMode === 'split') {
                that.splitModeScrollTop(itemOffset);
            }
        }
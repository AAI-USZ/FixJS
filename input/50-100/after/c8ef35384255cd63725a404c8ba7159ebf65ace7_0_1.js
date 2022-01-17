function() {
                current_chapter.height = that.locate('chapterContent').height();
                that.selectionWrapper();
                if (that.options.pageMode === 'scroll') {
                    that.locate('bookContainer').scrollTop(0);
                }
            }
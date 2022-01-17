function (chapter_content) {
            current_chapter = chapter_content;
            pagination = [],
            chapterElem = that.locate('chapterContent');

            that.resetSelection();
            chapterElem.html(current_chapter.content);
            that.locate('chapterStyle').html(current_chapter.styles);

            chapterElem.find('img').css({
                'max-width': that.options.constraints.maxImageWidth + 'px',
                'max-height': that.options.constraints.maxImageHeight + 'px',
                'height': 'auto',
                'width': 'auto'
            });

            /*
             waitForImages jQuery Plugin is a being used because of a bug in .load method of jquery
             .load method is not accurate and fails for cached images case.
             We need to calculate height of chapter (including height of images)
             in order to navigate inside the chapter
             */
            chapterElem.waitForImages(function() {
                current_chapter.height = that.locate('chapterContent').height();
                that.selectionWrapper();
                if (that.options.pageMode === 'scroll') {
                    that.locate('bookContainer').scrollTop(0);
                }
            });

            return false;
        }
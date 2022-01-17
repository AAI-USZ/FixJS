function (chapter_content) {
            current_chapter = chapter_content;
            pagination = [];
            that.resetSelection();

            that.locate('chapterContent').html(current_chapter.content);
            that.locate('chapterStyle').html(current_chapter.styles);
            that.locate('chapterContent').find('img').css({
                'max-width': '400px',
                'max-height': '300px',
                'height': 'auto',
                'width': 'auto'
            });
            //TODO Improve on load listener for already cached images if possible
            // undefined case for firefox
            if (that.locate('chapterContent').find('img:first').height() === 0 || that.locate('chapterContent').find('img:first').attr('height') === undefined) {
                that.locate('chapterContent').find('img:last').load(function () {
                    that.locate('chapterContent').find('img').each(function () {
                        that.manageImageSize($(this));
                    });
                    current_chapter.height = that.locate('chapterContent').height();
                    that.selectionWrapper();
                });
            } else { //non-caching case
                that.locate('chapterContent').find('img').each(function () {
                    that.manageImageSize($(this));
                });
                current_chapter.height = that.locate('chapterContent').height();
                that.selectionWrapper();
            }

            if (that.options.pageMode === 'scroll') {
                that.locate('bookContainer').scrollTop(0);
            }
            return false;
        }
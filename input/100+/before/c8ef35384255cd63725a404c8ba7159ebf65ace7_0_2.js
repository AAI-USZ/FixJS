function (selection) {
            var newMode = selection.pageMode;
            if (that.options.pageMode === 'scroll' && newMode === 'scroll') {
                return;
            } else if (that.options.pageMode === 'split' && newMode === 'split') {
                that.toc.reloadCurrent();
            } else {
                that.options.pageMode = newMode;
                if (that.options.pageMode === 'split') {
                    that.locate('remainingWrapper').show();
                    that.locate('chapterContent').css('overflow', 'hidden');
                    that.locate('bookContainer').css('overflow-y', 'hidden');
                } else if (that.options.pageMode === 'scroll') {
                    that.locate('remainingWrapper').hide();
                    that.locate('chapterContent').css('overflow', 'visible');
                    that.locate('bookContainer').css('overflow-y', 'auto');
                }
                that.toc.reloadCurrent();
            }
        }
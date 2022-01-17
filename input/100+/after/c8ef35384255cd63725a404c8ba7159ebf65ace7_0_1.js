function () {
            var internalNavigationHandler = function (elm) {
                var bId = elm.text(),
                    navPosition = that.findBookmarkPosition(bId),
                    current = that.model.repeatingData[navPosition];
                that.events.onBookmarkNavigate.fire(current.bookmarkChapter.value, current.bookmarkedItemOffset);
            };
            that.locate('bookmarkId').click(function () {
                internalNavigationHandler($(this));
            });
            that.locate('bookmarkId').keypress(function (e) {
                var code = e.keyCode || e.which;
                if (code === 13) {
                    internalNavigationHandler($(this));
                }
            });
        }
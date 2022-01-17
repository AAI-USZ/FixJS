function (that) {
        that.applier.modelChanged.addListener("repeatingData", function () {
            that.refreshView();
            that.resetUIHandlers();
        });

        // Delete Button Handler
        that.addDeleteHandler = function () {
            that.locate('bookmarkDelete').click(function (evt) {
                evt.preventDefault();
                var bId = $(this).attr('href'),
                    delPosition = that.findBookmarkPosition(bId);
                that.model.repeatingData.splice(delPosition, 1);
                that.applier.requestChange('repeatingData', that.model.repeatingData);
            });
        };

        // ToolTip effect
        // replace following event handler with jQuery UI 1.9 which will have toolTip widget
        that.addToolTipHandler = function () {
            that.locate('bookmarkId').each(function () {
                var bId = $(this).text(),
                    contentHtml =  that.model.repeatingData[that.findBookmarkPosition(bId)].bookmarkedItemHTML;
                $(this).qtip({
                    content: contentHtml,
                    position: {
                        corner: {
                            target: 'bottomMiddle', // Position the tooltip above the link
                            tooltip: 'topMiddle'
                        },
                        adjust: {
                            screen: true // Keep the tooltip on-screen at all times
                        }
                    },
                    show: {
                        when: 'focus',
                        solo: true // Only show one tooltip at a time
                    },
                    hide: 'blur',
                    style: {
                        tip: true, // Apply a speech bubble tip to the tooltip at the designated tooltip corner
                        border: {
                            width: 0,
                            radius: 5
                        },
                        name: 'light',
                        width: {
                            min: 50,
                            max: 500
                        }
                    }
                });
            });
        };

        that.resetUIHandlers = function () {
            that.locate('bookmarkId').fluid('tabbable');
            that.addDeleteHandler();
            that.addToolTipHandler();
        };

        that.addBookmark = function (newBookmark) {
            if (that.findBookmarkPosition(newBookmark) === -1) {
                that.model.repeatingData.push(newBookmark);
                that.applier.requestChange('repeatingData', that.model.repeatingData);
                return true;
            } else {
                return false;
            }
        };

        that.findBookmarkPosition = function (bId) {
            var i = 0,
                n = that.model.repeatingData.length;
            while (i < n) {
                if (that.model.repeatingData[i].bookmarkId === bId) {
                    return i;
                }
                i = i + 1;
            }
            return -1;
        };
    }
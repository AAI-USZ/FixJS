function () {
            that.locate('bookmarkId').fluid('tabbable');
            that.addDeleteHandler();
            that.addToolTipHandler();
            that.addEditHandler();
            that.addNavigationHanlder();
        }
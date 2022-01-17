function() {
                if (this.settings.autogrow == false) {
                    // don't autogrow
                    return;
                }
                if (this.wysiwyg) {
                    var extraSpace = 30;
                    var innerBody = $(this.iframe.contentWindow.document.body);
                    var toolbarList = $(this.toolbar.itemsList);
                    var newHeight = 0;
                    if (innerBody[0] == undefined) {
                        return;
                    }

                    var offset = Math.max(0, $(window).scrollTop() - $(this.iframe).offset().top);
                    offset = Math.min(offset, $(this.iframe).height() - toolbarList.height());

                    toolbarList.css({
                        top: offset
                    });

                    var lastElement = innerBody.children(":last");
                    if (lastElement.length > 0) {
                        newHeight = lastElement.offset().top + lastElement.height() + extraSpace - $(window).scrollTop();
                    } else {
                        newHeight = innerBody.offsetHeight + extraSpace;
                    }
                    newHeight = Math.max(newHeight, toolbarList.height());

                    // hide scrollbar
                    innerBody.css({
                        overflow: "hidden",
                        scroll: "no"
                    });

                    $(this.iframe).height(newHeight);
                    $(this.textarea).height(newHeight);
                } else {
                }
            }
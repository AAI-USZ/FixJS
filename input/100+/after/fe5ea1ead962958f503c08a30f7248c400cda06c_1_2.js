function () {
            // If this is a comment element then render items as siblings
            if (info.isComment) {
                if (_.isNumber(at)) {
                    if (at === 0) {
                        itemElements.insertAfter(element);
                    }
                    else {
                        $(element).nextUntil(info.endCommentElement).eq(at - 1).after(itemElements);
                    }
                }
                else {
                    itemElements.insertBefore(info.endCommentElement);
                }
            }
            // Else render items as children
            else {
                if (_.isNumber(at)) {
                    if (at === 0) {
                        itemElements.prependTo(element);
                    }
                    else {
                        $('> tr', element).eq(at - 1).after(itemElements);
                    }
                }
                else {
                    itemElements.appendTo(element);
                }
            }

            itemElements.each(function () {
                this[foreachExpando] = cid;
                databindings.databind.applyBindings(model, this, info.context);
            });
        }
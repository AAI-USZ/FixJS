function () {
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

            itemElements.each(function () {
                this[foreachExpando] = cid;
                databindings.databind.applyBindings(model, this, info.context);
            });
        }
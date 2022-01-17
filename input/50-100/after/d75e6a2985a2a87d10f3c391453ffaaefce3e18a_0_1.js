function(data) {
                // walk through the items on the next page
                // and add them to the items array
                container = $(opts.container, data).eq(0);
                if (0 == container.length) {
                    // incase the element is a root element (body > element),
                    // try to filter it
                    container = $(data).filter(opts.container).eq(0);
                }

                if (container) {
                    container.find(opts.item).each(function() {
                        items.push(this);
                    });
                }

                if (onCompleteHandler) onCompleteHandler.call(this, data, items);
            }
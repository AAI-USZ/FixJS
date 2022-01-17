function (force) {
        if (force || !scrollbarPlacement) {
            var db = document.body,
                div = document.createElement('div');

            div.style.width = div.style.height = '100px';
            div.style.overflow = 'scroll';
            div.style.position = 'absolute';

            db.appendChild(div); // now we can measure the div...

            scrollbarPlacement = (div.clientLeft > 0 || Ext.isIE8) ? 'left' : 'right';

            db.removeChild(div);
        }

        return scrollbarPlacement;
    }
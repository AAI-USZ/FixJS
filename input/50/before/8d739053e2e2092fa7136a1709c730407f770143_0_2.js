function (_, img) {
            jQuery(document.createElement('img'))
                .attr('src', DOKU_BASE+'lib/images/' + img[0] + '.gif')
                .click(img[1])
                .appendTo($ctl);
        }
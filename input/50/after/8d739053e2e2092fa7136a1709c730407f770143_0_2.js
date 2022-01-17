function (_, img) {
            jQuery(document.createElement('IMG'))
                .attr('src', DOKU_BASE+'lib/images/' + img[0] + '.gif')
                .click(img[1])
                .appendTo($ctl);
        }
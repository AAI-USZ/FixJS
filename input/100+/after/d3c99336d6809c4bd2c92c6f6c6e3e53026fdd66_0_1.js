function(el, cc) {
        var $el = $(el),
            val = $el.val(),
            max = parseInt(cc.attr('data-maxlength'), 10),
            left = max - val.length,
            cc_parent = cc.parent();
        // L10n: {0} is the number of characters left.
        cc.html(format(ngettext('<b>{0}</b> character left.',
                                '<b>{0}</b> characters left.', left), [left]))
          .toggleClass('error', left < 0);
        if(left >= 0 && cc_parent.hasClass('error')) {
            cc_parent.removeClass('error');
        }
    }
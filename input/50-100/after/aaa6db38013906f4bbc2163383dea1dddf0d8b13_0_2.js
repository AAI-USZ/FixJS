function() {
        var m = $(this).siblings('.message');
        var curH = m.height();
        m.css({
            'height': 'auto',
            'maxHeight': 'none'
        });
        console.log(m.css('maxHeight'));
        var autoH = m.height();
        m.height(curH).animate({'height': autoH}, 400);
        $(this).text('[ Less ]');
    }
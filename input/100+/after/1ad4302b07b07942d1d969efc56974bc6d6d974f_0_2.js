function(){
        var dt = this;

        // based on MIT-licensed code from: https://raw.github.com/brandonaaron/jquery-getscrollbarwidth/master/jquery.getscrollbarwidth.js

        if ("scrollbar_width" in dt){
            return dt.scrollbar_width;
        }

        var scrollbar_width = 0;        

        if ( $.browser.msie ) {
            var $textarea1 = $('<textarea cols="10" rows="2"></textarea>')
                    .css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body'),
                $textarea2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>')
                    .css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body');
            scrollbar_width = $textarea1.width() - $textarea2.width();
            $textarea1.add($textarea2).remove();
        } else {
            var $div = $('<div />')
                .css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000 })
                .prependTo('body').append('<div />').find('div')
                    .css({ width: '100%', height: 200 });
            scrollbar_width = 100 - $div.width();
            $div.parent().remove();
        }
        dt['scrollbar_width'] = scrollbar_width;
        return scrollbar_width;
    }
function(event) {
        var new_dom = $('<div />', {'class': 'tag-color-item'});
        var name_dom = $('<div />', {'class': 'tag-name'});
        var color_dom = $('<div />', {'class': 'tag-color'});
        var close_dom = $('<div />', {'class': 'tag-rm'}).html("x");

        var tagname = $(this).parent().prev().prev().find('select').val();
        var colorvalue = $(this).parent().prev().find('input').val();
        
        name_dom.html(tagname);
        color_dom.css('background-color', colorvalue);
        color_dom.attr('val', colorvalue);

        new_dom
            .append(name_dom)
            .append(color_dom)
            .append(close_dom);
        
        if (tagname.length > 0) {
            $(".selected-colors").append(new_dom);
            $(".selected-colors").show();
        }
    }
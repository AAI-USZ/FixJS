function init(settings)
    {
        if (! initialised)
        {
            initialised = true;

            $(''
                + '<div id="mbox_overlay" style="display:none;"></div>'
                + '<div id="mbox_wrap" style="display:none;">'
                + '<div id="mbox" style="display:none;">'
                +    '<table id="mbox_table">'
                +        '<tr>'
                +            '<td class="mbox_tl" />'
                +            '<td class="mbox_t" />'
                +            '<td class="mbox_tr" />'
                +        '</tr>'
                +        '<tr>'
                +            '<td class="mbox_l" />'
                +            '<td class="mbox_body">'
                +                '<div class="mbox_title"></div>'
                +                '<div class="mbox_content"></div>'
                +                '<div class="mbox_footer"></div>'
                +            '</td>'
                +            '<td class="mbox_r" />'
                +        '</tr>'
                +        '<tr>'
                +            '<td class="mbox_bl" />'
                +            '<td class="mbox_b" />'
                +            '<td class="mbox_br" />'
                +        '</tr>'
                +    '</table>'
                + '</div>'
                + '</div>'
            ).appendTo('body');

            if (isIE)
                $('.mbox_tl, .mbox_t, .mbox_tr, .mbox_l, .mbox_r, .mbox_bl, .mbox_b, .mbox_br').fixPNG();

            mbox_wrap = $('#mbox_wrap');
            mbox_table = $('#mbox_table');
            mbox_body = $('#mbox_wrap .mbox_body');
            mbox_overlay = $('#mbox_overlay');
            mbox_title = $('#mbox_wrap .mbox_title');
            mbox_content = $('#mbox_wrap .mbox_content');
            mbox_footer = $('#mbox_wrap .mbox_footer');

            function make_draggable(handle, container)
            {
                var body = $('body');

                handle.mousedown(function(event){ 
                    var initX = event.pageX - container.offset().left;
                    var initY = event.pageY - container.offset().top;

                    body.mousemove(function(event){ 
                        container.css({'position': 'absolute',
                                       'left': event.pageX - initX, 
                                       'top': event.pageY - initY
                                      });
                    });

                    body.mouseup(function(event)
                    {
                        body.unbind('mousemove');
                        body.unbind(event);
                    });

                    return false;
                });

                handle.hover(function(){
                    handle.css('cursor', 'move');
                }, function(){ 
                    handle.css('cursor', 'auto'); 
                });
            }
            
            make_draggable(mbox_title, mbox_wrap);

            

            // Loading image
            loading_image = $('<div class="mbox_loading" />').append(
                    $('<img alt="" src="/static/advanced_reports/img/modybox/loader.gif" />'));


            // Overlay opacity
            mbox_overlay.css('opacity', overlay_opacity);
        }


        // Set mbox body
        if (settings['width'] != undefined)
            $('#mbox_wrap .mbox_body').css('width', settings['width']);
        else
            $('#mbox_wrap .mbox_body').css('width', '');
    }
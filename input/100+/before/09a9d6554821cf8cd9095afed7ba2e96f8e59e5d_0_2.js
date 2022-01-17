function OverlayOpener(content_type, selection_callback) {
        var arg_content_type = content_type;
        var arg_selection_callback = selection_callback;

        // 1st step
        function init_overlay_html() {
            get_html_chunk('overlay', init_overlay_html_chunk_callback);
        }

        // 2nd step
        function init_overlay_html_chunk_callback(data) {
            overlay_html = data;
            continue_opening_overlay(arg_content_type, arg_selection_callback);
        }

        // 3rd (final) step
        function continue_opening_overlay(content_type, selection_callback) {
            var ooargs = arguments;
            if ( ! overlay_html ) {
                get_html_chunk('overlay', function(data) {
                    overlay_html = data;
                    ooargs.callee.apply(this, ooargs);
                });
                return;
            }

            var top_zindex = ( function() {
                var rv = 1;
                $('.ui-widget-overlay').each( function() {
                    rv = Math.max(rv, $(this).css('zIndex'));
                });
                return rv + 1;
            })();
            var $overlay = $('#changelist-overlay');
            if ($overlay.length == 0) {
                $overlay = $( overlay_html )
                .css({top:0,left:0})
                .appendTo(
                       $('.change-form').get(0)
                    || $('#content').get(0)
                    || $('body').get(0)
                );
                $('#overlay-content').bind('content_added', init_overlay_content);
            }
            $overlay.css({zIndex:top_zindex});

            $('#overlay-content').data('selection_callback', selection_callback);

            var ct_arr = /(\w+)\W(\w+)/.exec( content_type );
            if ( ! ct_arr ) {
                carp('open_overlay: Unexpected content type: '+content_type);
                return false;
            }
            var address = str_concat('/' , ct_arr[1] , '/' , ct_arr[2] , '/?pop');

            Kobayashi.load_content({
                address: address,
                target_id: 'overlay-content',
                selection_callback: selection_callback
            });
        }
        
        // init
        init_overlay_html();

        return this;
    }
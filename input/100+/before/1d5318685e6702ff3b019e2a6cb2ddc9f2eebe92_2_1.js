function( options ) {
                options = options || {};
                ajaxSettings = $.extend({
                    type: "GET"
                }, options.ajax || {}, ajaxSettings );

                return $.ajax( ajaxSettings );
            }
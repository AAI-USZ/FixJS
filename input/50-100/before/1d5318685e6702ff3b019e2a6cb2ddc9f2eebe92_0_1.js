function( data, options ) {
                options = options || {};
                ajaxSettings = $.extend({
                    type: "DELETE",
                    data: data || ""
                }, options.ajax || {}, ajaxSettings );

                return $.ajax( ajaxSettings );
            }
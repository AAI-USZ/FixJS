function( data, options ) {
                options = options || {};
                ajaxSettings = $.extend({
                    type: "DELETE",
                    data: data || ""
                }, ajaxSettings, options.ajax || {} );

                return $.ajax( ajaxSettings );
            }
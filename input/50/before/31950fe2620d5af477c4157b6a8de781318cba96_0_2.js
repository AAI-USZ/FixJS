function _subscribe(options) {
                _reinit();

                _request = jQuery.extend(_request, options);
                _uuid = jQuery.atmosphere.guid();
            }
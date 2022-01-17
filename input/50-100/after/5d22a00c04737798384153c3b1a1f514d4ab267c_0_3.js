function _localMessage(message) {
                var m = jQuery.parseJSON(message);
                if (m.id != guid) {
                    if (typeof(_request.onLocalMessage) != 'undefined') {
                        _request.onLocalMessage(m.event);
                    } else if (typeof(jQuery.atmosphere.onLocalMessage) != 'undefined') {
                        jQuery.atmosphere.onLocalMessage(m.event);
                    }
                }
            }
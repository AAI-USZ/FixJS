function _attachHeaders(request) {
                var rq = _request;
                if ((request != null) && (typeof(request) != 'undefined')) {
                    rq = request;
                }

                var url = rq.url;

                // If not enabled
                if (!rq.attachHeadersAsQueryString) return url;

                // If already added
                if (url.indexOf("X-Atmosphere-Framework") != -1) {
                    return url;
                }

                url += (url.indexOf('?') != -1) ? '&' : '?';
                url += "X-Atmosphere-tracking-id=" + _uuid;
                url += "&X-Atmosphere-Framework=" + jQuery.atmosphere.version;
                url += "&X-Atmosphere-Transport=" + rq.transport;

                if (rq.trackMessageLength) {
                    url += "&X-Atmosphere-TrackMessageSize=" + "true";
                }

                if (rq.lastTimestamp != undefined) {
                    url += "&X-Cache-Date=" + rq.lastTimestamp;
                } else {
                    url += "&X-Cache-Date=" + 0;
                }

                if (rq.contentType != '') {
                    url += "&Content-Type=" + rq.contentType;
                }

                jQuery.each(rq.headers, function(name, value) {
                    var h = jQuery.isFunction(value) ? value.call(this, rq, request, _response) : value;
                    if (h != null) {
                        url += "&" + encodeURIComponent(name) + "=" + encodeURIComponent(h);
                    }
                });

                return url;
            }
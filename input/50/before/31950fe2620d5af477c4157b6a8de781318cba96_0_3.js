function _buildWebSocketUrl() {
                var url = _request.url;
                url = _attachHeaders();
                return decodeURI(jQuery('<a href="' + url + '"/>')[0].href.replace(/^http/, "ws"));
            }
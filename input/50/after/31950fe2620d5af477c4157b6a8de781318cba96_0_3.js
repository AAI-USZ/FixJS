function _buildWebSocketUrl() {
                var url = _attachHeaders(_request);
                return decodeURI(jQuery('<a href="' + url + '"/>')[0].href.replace(/^http/, "ws"));
            }
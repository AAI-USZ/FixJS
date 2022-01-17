function _buildSSEUrl() {
                var url = _request.url;
                url = _attachHeaders();
                return url;
            }
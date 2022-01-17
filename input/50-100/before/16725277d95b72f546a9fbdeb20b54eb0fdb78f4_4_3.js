function(headers) {
                headers = that.setAcceptEncoding(headers);
                headers = that.setNewRequestHost(headers);
                headers = that.setNewReferrer(headers);
                return headers;
            }
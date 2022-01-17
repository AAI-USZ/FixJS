function(oheaders) {
                var headers = JSON.parse(JSON.stringify(oheaders));
                headers = that.setAcceptEncoding(headers);
                headers = that.setNewRequestHost(headers);
                headers = that.setNewReferrer(headers);
                return headers;
            }
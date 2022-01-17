function(xhr) {
                if (that.sessionHeader)
                    xhr.setRequestHeader(that.SESSION_HEADER, that.sessionHeader);
            }
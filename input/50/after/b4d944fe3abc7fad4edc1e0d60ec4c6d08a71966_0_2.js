function() {
                reader.onloadend = reader.onerror = null;
                // this is regular file
                callback(true);
            }
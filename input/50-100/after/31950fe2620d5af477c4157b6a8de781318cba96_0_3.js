function() {
            var storage = window.localStorage;
            if (storage) {
                try {
                    storage.setItem("t", "t");
                    storage.removeItem("t");
                    // Internet Explorer 9 has no StorageEvent object but supports the storage event
                    return !!window.StorageEvent || Object.prototype.toString.call(storage) === "[object Storage]";
                } catch (e) {
                }
            }

            return false;
        }
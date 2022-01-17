function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + encodeBase64(user + ":" + password || ""));
                if (typeof origBeforeSend === "function")
                    origBeforeSend.apply(this, xhr);
            }
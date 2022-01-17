function (settings, xhr) {

            if (typeof xhr.aborted === "undefined" &&

                    typeof xhr.error === "undefined" &&

                    xhr.readyState === REQUEST_STATE_DONE &&

                    xhr.status === REQUEST_STATE_UNSENT) {

                xhr.abort();

                timeout_handler.call(null, settings, xhr);

            }

        }
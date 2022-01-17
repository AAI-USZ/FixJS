function(jq_xhr, text_status, error_thrown) {
                if (LOG_AJAX_REQUESTS) dm4c.log("..... " + jq_xhr.status + " " + jq_xhr.statusText +
                    "\n..... exception: " + JSON.stringify(error_thrown))
                throw "RESTClientError: " + method + " request failed (" + text_status + ": " + error_thrown + ")"
            }
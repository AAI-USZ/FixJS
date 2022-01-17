function(script_url, callback) {
        $.ajax({
            url: script_url,
            dataType: "script",
            async: callback != undefined,
            success: callback,
            error: function(jq_xhr, text_status, error_thrown) {
                throw text_status + ": " + error_thrown
            }
        })
    }
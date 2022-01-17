function(script_url, callback) {
        $.ajax({
            url: script_url,
            dataType: "script",
            success: callback,
            async: callback != undefined
        })
    }
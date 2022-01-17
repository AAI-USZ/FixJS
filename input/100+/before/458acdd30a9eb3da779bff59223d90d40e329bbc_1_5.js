function with_reqs(reqs, acc, fun) {
    if (keys(reqs).length > 0) {
        var key = keys(reqs)[0];
        with_req('/api' + reqs[key], function(resp) {
                acc[key] = jQuery.parseJSON(resp.responseText);
                var remainder = {};
                for (var k in reqs) {
                    if (k != key) remainder[k] = reqs[k];
                }
                with_reqs(remainder, acc, fun);
            });
    }
    else {
        fun(acc);
    }
}
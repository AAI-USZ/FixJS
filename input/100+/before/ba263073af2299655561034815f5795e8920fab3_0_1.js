function redditRequest(op, parameters, worker_in, block, options) {
    var api_loc = options.api_loc;
    var cleanup_func = options.cleanup_func;

    var action = op;
    var worker = worker_in;
    if (!api_loc) {
      api_loc = '/api/';
    }

    if (!parameters) {
        parameters = {};
    }
    if (post_site) {
        parameters.r = post_site;
    }
    if (cnameframe) {
        parameters.cnameframe = 1;
    }
    op = api_loc + op;
    if(!worker) {
        worker = handleResponse(action,cleanup_func);
    }
    else {
        worker = function(r) {
            remove_ajax_work(action);
            return worker_in(r);
        }
    }
    if(block == null || add_ajax_work(action)) {
        new Ajax.Request(op, {parameters: make_get_params(parameters),
                    onComplete: worker});
    }
}
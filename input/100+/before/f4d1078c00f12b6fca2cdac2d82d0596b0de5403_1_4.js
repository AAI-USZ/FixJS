function post_form(form, where, statusfunc, nametransformfunc, block, api_loc, cleanup_func) {
    var p = {uh: modhash};
    var id = _id(form);
    var status = $("status");

    if(statusfunc == null) {
        statusfunc = function(x) { return _global_submitting_tag; };
    }
    if(nametransformfunc == null) {
        nametransformfunc = function(x) {return x;}
    }
    if(id) {
        status = $("status_" + id);
        p.id = id;
    }
    if(status) { status.innerHTML = statusfunc(form); }
    for(var i = 0; i < form.elements.length; i++) {
        if(! form.elements[i].id || !id ||
           _id(form.elements[i]) == id) {
            var f = field(form.elements[i]);
            if (f) {
                p[nametransformfunc(form.elements[i].name)] = f;
            }
        }
    }
    redditRequest(where, p, null, block, api_loc, cleanup_func);
    return false;
}
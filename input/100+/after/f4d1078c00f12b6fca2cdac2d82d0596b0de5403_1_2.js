function(r) {
        remove_ajax_work(action);
        var res_obj = parse_response(r);

        if (prehandle_func) {
            prehandle_func(res_obj);
        }

        if(!res_obj) {
            if($('status'))
                $('status').innerHTML = '';
            return;
        }

        // first thing to check is if a redirect has been requested
        if(res_obj.redirect) {
            if(window.location.toString() == unsafe(res_obj.redirect)) {
                window.location.reload(true);
                return;
            }
            window.location = unsafe(res_obj.redirect);
            return;
        }

        // next check for errors
        var error = res_obj.error;
        if(error && error.name) {
            var errid = error.name;
            if (error.id) { errid += "_" + error.id; }
            errid = $(errid);
            if (errid) {
                show(errid);
                $(errid).innerHTML = error.message;
            }
        }

        if (cleanup_func) {
            cleanup_func(res_obj);
        }
  
        var r = res_obj.response;
        if(!r)
            return;
        var obj = r.object;
        if(obj) {
            my_iter(tup(obj),
                    function(u) {
                        if(u && u.kind && class_dict[u.kind]) {
                            var func = (class_dict[u.kind][u.action] ||
                                        class_dict[u.kind][action]);
                            if(func) {
                                func(u.data);
                            }
                        }
                    });
        }
        // handle applied CSS
        if(r.call) {
            var calls = r.call;
            for(var i=0; i<calls.length; i++) {
                eval(calls[i]);
            }
        }
        // handle shifts of focus
        if (r.focus) {
            var f = $(r.focus);
            if(f) {f.focus();
                f.onfocus = null;}
        }
        if (r.blur) {
            var f = $(r.blur);
            if(f) {f.blur();
                f.onblur = null;}
        }
        if (r.captcha) {
            if (r.captcha.refresh) {
                var id = r.captcha.id;
                var captcha = $("capimage" + (id?('_'+id):''));
                var capiden = $("capiden" + (id?('_'+id):''));
                capiden.value = r.captcha.iden;
                captcha.src = ("/captcha/" + r.captcha.iden + ".png?" +
                               Math.random())
            }
        }
        if (r.success) {
            fire_success();
        }
        my_iter(r.update,
                function(u) {
                    var field = u.id && $(u.id);
                    if(field) {
                        for(var i in u) {
                            if(typeof(u[i]) != "function" && u != 'name') {
                                field[i] = unsafe(u[i]);
                            }
                        } }});
        my_iter(r.hide,
                function(h) {
                    var field = h.name && $(h.name);
                    if(field) { hide(field); }});
        my_iter(r.show,
                function(h) {
                    var field = h.name && $(h.name);
                    if(field) { show(field); }});

    }
function (success_cb, error_cb) {
            var retUrl = VIAFO_SETTINGS.GetReturnUrl(),
                data = {
                    //'verbs' : 'share',
                    'access_token': VIAFO_ACCESS_TOKEN,
                    'return_url' : retUrl,
                    'suppress_response_codes' : true
                };
            
            function handleError(code) {
                if (code === 401) {
                    me.RETRY_COUNT = 0;
                    me.VIAFO_SERVICES_REFRESH = true;
                    
                    VIAFO_ACCESS_TOKEN = null;
                    me.CallRegister(success_cb, error_cb);
                    return;
                }
                
                me.RETRY_COUNT += 1;
                
                if (me.RETRY_COUNT < 3) {
                    me.CallGetServices(success_cb, error_cb);
                } else {
                    me.VIAFO_SERVICES_REFRESH = true;
                    me.RETRY_COUNT = 0;
                    
                    error_cb = eventNameToFunc(error_cb);
                    error_cb(xhr, result, msg);
                }
            }
            
            doCall('get_services.json', 
                data, 
                function (data, result, xhr) {
                    var i, service, services = [];
                    
                    // As we're suppressing error codes, we need to check
                    // for errors here
                    if (data['code'] && data['code'] !== 200) {
                        handleError(data['code']);
                        return;
                    }
                    
                    $.each(data.authenticated, function (i, service) {
                            service.authenticated = true;
                            services.push(service);
                        });
                    $.each(data.available, function (i, service) {
                            service.authenticated = false;
                            services.push(service);
                        });
                    
                    me.VIAFO_SERVICES = services;
                    me.VIAFO_SERVICES_REFRESH = false;
                    me.RETRY_COUNT = 0;
                    
                    $(document).trigger('com.viafo.got_services', [services]);
                    
                    success_cb = eventNameToFunc(success_cb);
                    success_cb(data, result, xhr);
                }, 
                function (xhr, result, msg) {
                    if (xhr && xhr.status) {
                        handleError(xhr.status);
                    } else {
                        handleError(0);
                    }
                });
        }
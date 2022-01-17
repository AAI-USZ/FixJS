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
                }
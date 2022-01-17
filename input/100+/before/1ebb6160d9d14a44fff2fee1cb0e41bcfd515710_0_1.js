function (xhr, result, msg) {
                    if (xhr && xhr.status) {
                        if (xhr.status === 401) {
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
                }
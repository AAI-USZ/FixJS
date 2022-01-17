function(){
                    ajax_status[x.fn_name].status = 'ACTIVE';
                    ajax_status[x.fn_name].trigger_delay = 0;
                    clearTimeout(ajax_settimeouts[x.fn_name]);
                    if (x.interval != -1){
                        ajax_settimeouts[x.fn_name] = setTimeout(function(){exec_ajax(x);}, x.interval);
                    }
                }
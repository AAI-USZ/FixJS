function(e) {
                e.stopPropagation();
               
                itms.total = $cfs.children().length;
                var sz = $cfs.triggerHandler('updateSizes');
                nv_showNavi(opts, itms.total, conf);
                nv_enableNavi(opts, itms.first, conf);
                $cfs.trigger(cf_e('updatePageStatus', conf), [true, sz]);
                $cfs.trigger(cf_e('configuration', conf), conf, true);

                return true; 
            }
function(e) {
                e.stopPropagation();
               
                $cfs.trigger(cf_e('configuration', conf), conf, true);

                return true; 
            }
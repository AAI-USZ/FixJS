function() {
            var THIS = this;

            THIS.is_initialized = true;

            if(winkstart.apps['pbxs']['default']){
                THIS.setup_page();
            }
        }
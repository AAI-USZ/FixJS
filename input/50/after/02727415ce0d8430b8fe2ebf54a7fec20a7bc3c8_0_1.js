function() {
            var THIS = this;

            THIS.is_initialized = true;

            if(winkstart.apps['pbxs']['default']) {
                $('[data-whapp="pbxs"] > a').addClass('activate');
                THIS.setup_page();
            }
        }
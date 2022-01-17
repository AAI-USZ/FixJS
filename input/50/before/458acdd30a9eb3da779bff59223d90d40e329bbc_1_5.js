function(html) {
            replace_content('main', html);
            postprocess();
            postprocess_partial();
            set_timer_interval(5000);
        }
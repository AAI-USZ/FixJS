function(html) {
            replace_content('main', html);
            postprocess();
            postprocess_partial();
            reset_timer();
        }
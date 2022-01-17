function() {
            if (!iframe) { that.make(); };
            if (times_taken.length < times_to_test) {
                iframe.bind('load', that.mark_time);
                start_time = new Date().valueOf();
                iframe.attr( 'src', ad_url );
            } else {
                that.display_results();
            }
            return that;
        }
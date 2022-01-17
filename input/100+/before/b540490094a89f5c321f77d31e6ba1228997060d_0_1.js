function() {
            var that = $(this);
            var options = that.data('rapid').a.ajax_attrs;
            if(!options.message) options.message="Loading...";
            var roptions = that.hjq('buildRequest', {
                type: 'GET',
                attrs: options
            });
            if(options.push_state) {
                window.History.pushState(null, options.new_title || null, that.attr('href'));
            };
            $.ajax(that.attr('href'), roptions);
            return false;
        }
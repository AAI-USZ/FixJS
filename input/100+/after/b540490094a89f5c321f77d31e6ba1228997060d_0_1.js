function() {
            var that = $(this);
            var options = that.data('rapid').a.ajax_attrs;
            if(!options.message) options.message="Loading...";
            var hobo_options = {type: 'GET', attrs: options};
            var roptions = that.hjq('buildRequestData', hobo_options);
            that.hjq("changeLocationAjax", that.attr('href'), roptions, hobo_options);
            return false;
        }
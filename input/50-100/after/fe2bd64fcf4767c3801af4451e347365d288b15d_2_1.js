function(reason){
        var base_selector = '.marked-tags';
        if (reason === 'good') {
            var extra_selector = '.interesting';
        } else if (reason === 'bad') {
            var extra_selector = '.ignored';
        } else if (reason === 'subscribed') {
            var extra_selector = '.subscribed';
        }
        return $(base_selector + extra_selector);
    }
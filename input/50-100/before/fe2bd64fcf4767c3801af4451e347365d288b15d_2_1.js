function(reason){
        var base_selector = '.marked-tags';
        if (reason === 'good'){
            var extra_selector = '.interesting';
        } else {
            var extra_selector = '.ignored';
        }
        return $(base_selector + extra_selector);
    }
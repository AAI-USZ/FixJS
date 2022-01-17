function() {
        $(Edgar.map).trigger('changemode', 'current');
        setTimeout( function() {
            $(Edgar.map).trigger('changemode', 'vetting');
        }, 1000);
    }
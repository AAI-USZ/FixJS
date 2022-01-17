function(value, options) {
        if (typeof value === 'object' && !options) {
            options = value;
            value = null;
        }
        var opts = options || {};
        var useStyle = opts.useStyle === false ? false : true;
        
        // loop the found items
        return this.each(function() {
            var $elem = $(this), $copy;
            
            // find the copy elements
            $copy = $elem.find('.' + prefix + '-copy');
            
            // create them if none exist
            if (!$copy.length) {
                // create all of the elements
                allWords(this);
                $copy = $elem.find('.' + prefix + '-copy');
            }
            if (useStyle) {
                applyStyles($copy, value);
            }
        });
    }
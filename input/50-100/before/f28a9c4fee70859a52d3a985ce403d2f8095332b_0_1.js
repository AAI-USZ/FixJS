function() {
            var $elem = $(this), $copy;
            
            // find the copy elements
            $copy = $elem.find('.ui-text-shadow-copy');
            
            // create them if none exist
            if (!$copy.length) {
                // create all of the elements
                allWords(this);
                $copy = $elem.find('.ui-text-shadow-copy');
            }
            if (useStyle) {
                applyStyles($copy, value);
            }
        }
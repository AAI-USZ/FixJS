function() {
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
        }
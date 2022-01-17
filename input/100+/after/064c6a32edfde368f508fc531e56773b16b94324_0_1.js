function() {
            var $elem = $(this),
                copySelector = '.' + prefix + '-copy',
                $copy;
            
            // find the copy elements
            $copy = $elem.find(copySelector);
            
            // create them if none exist
            if (!$copy.length) {
                // create all of the elements
                allWords(this);
                $copy = $elem.find(copySelector);
            }
            if (useStyle) {
                applyStyles($copy, value);
            } else if (numShadows > 1) {
                $copy.filter(copySelector + '-1').each(function() {
                    var i = 1,
                        $parent = $(this.parentNode),
                        shadowSelector, $elem;
                    while (i < numShadows) {
                        shadowSelector = copySelector + '-' + (i + 1);
                        if (!$parent.find(shadowSelector).length) {
                            $elem = $(this.cloneNode(true))
                                .addClass(shadowSelector.substring(1))
                                .removeClass(prefix + '-copy-1');
                            $parent.prepend($elem);
                        }
                        i++;
                    }
                });
            }
        }
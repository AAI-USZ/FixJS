function() {
            if (this.nodeType === 3 && this.data) {
                makeWords(this);
                return true;
            }
            
            var $elem = $(this);
            if (this.nodeType === 1 && (!$elem.hasClass('ui-text-shadow') || !$elem.hasClass('ui-text-shadow-original') || !$elem.hasClass('ui-text-shadow-copy'))) {
                allWords(this);
                return true;
            }
        }
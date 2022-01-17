function() {
            if (this.nodeType === 3 && this.data) {
                makeWords(this);
                return true;
            }
            
            var $elem = $(this);
            if (this.nodeType === 1 && (!$elem.hasClass(prefix) || !$elem.hasClass(prefix + '-original') || !$elem.hasClass(prefix + '-copy'))) {
                allWords(this);
                return true;
            }
        }
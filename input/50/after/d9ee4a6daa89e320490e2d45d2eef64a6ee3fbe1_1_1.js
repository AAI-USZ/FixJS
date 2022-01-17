function htmlEscape(string) {
            return string.replace(/&/g, '&amp;')
                         .replace(/"/g, '&quot;')
                         .replace(/</g, '&lt;');
        }
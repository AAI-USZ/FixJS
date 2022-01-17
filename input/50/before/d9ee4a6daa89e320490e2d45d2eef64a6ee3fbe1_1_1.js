function htmlEscape(string) {
            string = string.replace(/&/g, '&amp;');
            string = string.replace(/"/g, '&quot;');
            string = string.replace(/</g, '&lt;');
            return string;
        }
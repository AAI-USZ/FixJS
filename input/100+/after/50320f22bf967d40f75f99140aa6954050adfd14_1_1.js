function getSelectedText(s) {
    for (var l = s.options.length; l --;) {
        if (s.options[l].selected) {
            return s.options[l].text;
        }
    }    
}
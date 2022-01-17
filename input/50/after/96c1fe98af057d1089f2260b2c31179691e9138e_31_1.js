function regexEscape(str) {
        return str.replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1");
    }
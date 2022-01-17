function tracLinkText(link, label) {
    	// escapes everything up until the first slash
        var linkWithoutServerAndPath = link.replace(/.*\//g, "");
    
    
        if (!/\]/.test(label) && !/^[\"\']/.test(label)) {
            return "[[" + label + "][" + linkWithoutServerAndPath + "]]";
        }
        if (!/\"/.test(label)) {
            return "[[" + label + ']["' + linkWithoutServerAndPath + '"]]';
        }
        if (!/\'/.test(label)) {
            return "[[" + label + "]['" + linkWithoutServerAndPath + "']]";
        }
        return "[[" + label.replace(/"+/g, "") + ' ]["' + linkWithoutServerAndPath + '"]]';
    }
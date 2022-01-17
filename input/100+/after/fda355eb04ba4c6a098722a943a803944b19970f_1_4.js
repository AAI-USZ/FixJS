function tracLinkText(link, label) {
        if (!/\]/.test(label) && !/^[\"\']/.test(label)) {
            return "[[" + label + "][" + link + "]]";
        }
        if (!/\"/.test(label)) {
            return "[[" + label + ']["' + link + '"]]';
        }
        if (!/\'/.test(label)) {
            return "[[" + label + "]['" + link + "']]";
        }
        return "[[" + label.replace(/"+/g, "") + ' ]["' + link + '"]]';
    }
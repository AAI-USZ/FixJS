function(link) {
    if (/^[\/.#]/.test(link)) {
        link = encodeURIComponent(link);
    }
    if (!/^[\w.+-]+:/.test(link)) {
        link = "wiki:" + link;
    }
    if (/^wiki:[^\"\']/.test(link) && /\s/.test(link)) {
        if (link.indexOf('"') === -1) {
            link = 'wiki:"' + link + '"';
        }
        else if (link.indexOf("'") === -1) {
            link = "wiki:'" + link + "'";
        }
        else {
            link = 'wiki:"' + link.replace(/"/g, "%22") + '"';
        }
    }
    return link;
}
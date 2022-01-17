function(link) {
    if (/^[\/.#]/.test(link)) {
        link = encodeURIComponent(link);
    }
    if (!/^[\w.+-]+:/.test(link)) {
        link = link;
    }
    if (/^[^\"\']/.test(link) && /\s/.test(link)) {
        if (link.indexOf('"') === -1) {
            link = '"' + link + '"';
        }
        else if (link.indexOf("'") === -1) {
            link = "'" + link + "'";
        }
        else {
            link = '"' + link.replace(/"/g, "%22") + '"';
        }
    }
    return link;
}
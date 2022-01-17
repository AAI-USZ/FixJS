function(link, label) {
            var attrs = {
                href: link, //encodeURIComponent(link),
                title: link, onclick: "return false;" };
            return element("a", attrs, label || link);
        }
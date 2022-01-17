function(link, label) {
            var attrs = {
                href: link,
                title: link,
                'data-wysiwyg-link': link,
                onclick: "return false;" };
            return element("a", attrs, label || link);
        }
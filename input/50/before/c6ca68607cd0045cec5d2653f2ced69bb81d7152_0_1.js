function urlX(url) {
        // Data URIs are subject to a bug in Firefox
        // https://bugzilla.mozilla.org/show_bug.cgi?id=255107
        // which let them be a vector. But WebKit does 'the right thing'
        // or at least 'something' about this situation, so we'll tolerate
        // them.
        if (/^(https?:\/\/|data:image)/.test(url)) {
            return url;
        }
    }
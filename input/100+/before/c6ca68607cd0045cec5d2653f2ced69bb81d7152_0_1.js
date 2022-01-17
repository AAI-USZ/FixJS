function urlX(url) {
        if (/^(https?:\/\/|data:image)/.test(url)) {
            return url;
        }
    }
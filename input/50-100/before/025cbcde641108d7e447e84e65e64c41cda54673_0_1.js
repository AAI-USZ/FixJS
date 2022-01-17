function() {
            if (attr = this.getAttribute(opts.attribute)) {
                absolutify.href = attr;
                this.setAttribute('x-src', getImageURL(absolutify.href, opts))
            }
        }
function() {
            if (attr = this.getAttribute(opts.attribute)) {
                absolutify.href = attr;
                var url = absolutify.href;
                // Produce an image resize url only for matched protocols
                if(protocolMatcher.exec(url)) {
                    this.setAttribute('x-src', getImageURL(url, opts));
                }
            }
        }
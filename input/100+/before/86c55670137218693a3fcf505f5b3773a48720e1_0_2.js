function($els) {
        var $scripts = $els.filter(defaults.selector).add($els.find(defaults.selector)).remove()
          , uncached = []
          , combo = false
          , bootstrap
          , url;

        // Fastfail if there are no scripts or if required modules are missing.
        if (!$scripts.length || !window.localStorage || !window.JSON) return $scripts;

        httpCache.load();

        $scripts.filter('[' + defaults.attribute + ']').each(function() {
            combo = true
            absolutify.href = this.getAttribute(defaults.attribute);
            url = absolutify.href;

            if (!httpCache.get(url)) {
                uncached.push(url);
            }

            this.removeAttribute(defaults.attribute);
            this.className += ' x-combo';
            this.innerHTML = defaults.execCallback + "('" + url + "');";
        });

        if (!combo) return $scripts;

        bootstrap = document.createElement('script')

        if (uncached.length) {
            bootstrap.src = getURL(uncached, defaults.loadCallback);
        } else {
            bootstrap.innerHTML = defaults.loadCallback + '();';
        }

        $scripts = $(bootstrap).add($scripts);
        return $scripts;
    }
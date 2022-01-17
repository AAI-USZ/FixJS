function (regionName) {
        var regionEl = rootElement.querySelector("div[data-winning-region='" + regionName + "']");

        if (!regionEl) {
            return Q.reject(new Error('There is no region "' + regionName + '".'));
        }

        return Q.when(regionMap[regionName].render()).then(function (renderedElement) {
            regionEl.parentNode.replaceChild(renderedElement, regionEl);
        });
    }
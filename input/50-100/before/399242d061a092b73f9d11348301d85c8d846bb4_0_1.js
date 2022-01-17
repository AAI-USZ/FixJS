function (regionName) {
        var regionEl = rootElement.querySelector("div[data-winning-region='" + regionName + "']");

        // Don't call `WinJS.UI.processAll` for subcomponents; it will be called on the root element.
        return Q.when(regionMap[regionName].render()).then(function (renderedElement) {
            regionEl.parentNode.replaceChild(renderedElement, regionEl);
        });
    }
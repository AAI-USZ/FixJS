function() {
        var paginator = this,
            host = paginator._host,
            optimizeMemory = paginator.optimizeMemory,
            currentIndex = paginator._cIndex,
            pageNodes;

        if (!optimizeMemory) {
            return false;
        }

        // Show the pages in/near the viewport & hide the rest
        // pageNodes = paginator._getStage(currentIndex);
        // paginator._showNodes(pageNodes.visible);
        // paginator._hideNodes(pageNodes.hidden);
        // host.scrollTo(currentIndex, 0);
    }
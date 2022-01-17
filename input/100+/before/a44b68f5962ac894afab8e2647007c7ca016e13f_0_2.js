function(e) {
        var paginator = this,
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size();

        paginator.set(TOTAL, size);
    }
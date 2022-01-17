function (strategy, root, segment, path) {
        if (typeof (strategy) === "function") { 
            return strategy(root, segment, path);
        } else if (strategy && strategy.next) {
            return strategy.next(root, segment, path);
        }
    }
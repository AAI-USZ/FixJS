function () {
        var paginator = this,
            index = paginator.get(INDEX),
            target = index - 1;

        if (target < 0) {
            target = 0;
        }
        
        paginator.set(INDEX, target);
    }
function () {
        var paginator = this,
            index = paginator.get(INDEX),
            target = index + 1;

        paginator.set(INDEX, target);
    }
function(x) {
        ok(x, "Something returned");
        ok(x.isCollection);
        ok(x.at(0).isEntity);
        start();
    }
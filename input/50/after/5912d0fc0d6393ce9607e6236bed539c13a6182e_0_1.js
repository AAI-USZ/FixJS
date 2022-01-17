function (key) {
        var prop = w[key];
        self[key] = prop.bind && prop.bind(w) || prop;
    }
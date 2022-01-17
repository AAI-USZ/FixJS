function (arc) {
        var arcObj = {};
        arcObj['id'] = arc.id();
        arcObj['sbo'] = 0; //TODO: do the sbo mapping
        arcObj['source'] = arc.source().id();
        arcObj['target'] = arc.target().id(); //TODO: deal with state vars, etc
        var arcData = {};
        arcObj['data'] = arcData;

        goog.array.insert(jsbgn['edges'], arcObj);
    }
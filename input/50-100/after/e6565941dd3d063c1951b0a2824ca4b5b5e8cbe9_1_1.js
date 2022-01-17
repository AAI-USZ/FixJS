function (arc) {
        var arcObj = {};
        arcObj['id'] = arc.id();
        arcObj['sbo'] = sb.sbo.ArcTypeMapping[arc.type()]; //TODO: do the sbo mapping
        arcObj['source'] = arc.source().id();
        arcObj['target'] = arc.target().id(); //TODO: deal with state vars, etc
        var arcData = {};
        arcObj['data'] = arcData;

        goog.array.insert(jsbgn['edges'], arcObj);
    }
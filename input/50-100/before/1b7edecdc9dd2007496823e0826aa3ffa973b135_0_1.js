function(props, callback) {

    if (!props.from || !props.to) {
        callback(new Error("Need 'from' and 'to'"), null);
        return;
    }

    props.from = Identifier.canonical(props.from);
    props.to = Identifier.canonical(props.to);

    props.fromto = Edge.makeFromTo(props.from, props.to);
    props.created = props.modified = Date.now();
    callback(null, props);
}
function (type, schema, options) {

    this.type       = type;
    this.options    = options;

    if (_.isFunction(schema)) {

        this.fn = schema;
    } else if (_.isObject(schema)) {

        this.schema = schema;
    }
}
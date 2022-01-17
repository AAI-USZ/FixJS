function (name, schema, options) {

    this.name       = name;
    this.options    = options;

    if (_.isFunction(schema)) {

        this.fn = schema;
    } else if (_.isObject(schema)) {

        this.schema = schema;
    }
}
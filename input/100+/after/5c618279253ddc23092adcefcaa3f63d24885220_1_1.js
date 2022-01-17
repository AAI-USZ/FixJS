function(data, schema, options){

  var i = 0, len = data.columns.length, item, name,
      deserializeName, deserializeValue,
      deserializeNameDefault = new Marshal(schema.default_name_type || 'BytesType').deserialize,
      deserializeValueDefault = new Marshal(schema.default_value_type || 'BytesType').deserialize;

  // Deserialize by default.
  options = options || {};
  options.deserialize = options.deserialize !== undefined ? options.deserialize : true;

  this.key = data.key;
  this._map = {};
  this._schema = schema;

  for(; i < len; i += 1){
    item = data.columns[i];

    // Default name deserializer
    deserializeName = deserializeNameDefault;

    // Individual columns can be set with a different name deserializer (in
    // case of CompositeColumns)
    if(schema.name_types && schema.name_types[item.name]){
      deserializeName = new Marshal(schema.name_types[item.name]).deserialize;
    }
    name = deserializeName(item.name);

    //default value decoder
    deserializeValue = deserializeValueDefault;

    //individual columns can be set with a different value deserializer
    if(schema.value_types && schema.value_types[item.name]){
      deserializeValue = new Marshal(schema.value_types[item.name]).deserialize;
    }

    //when doing select * you get a column called KEY, it's not good eats.
    if(item.name !== 'KEY'){

      // Only deserialize if specified
      if(options.deserialize) {
        this.push(new Column(name,deserializeValue(item.value), new Date(item.timestamp / 1000), item.ttl));
      } else {
        this.push(new Column(name,item.value, new Date(item.timestamp / 1000), item.ttl));
      }

      this._map[name] = this.length - 1;
    }
  }

  /**
   * Return the columns count, synonymous to length
   */
  this.__defineGetter__('count', function(){
    return this.length;
  });
}
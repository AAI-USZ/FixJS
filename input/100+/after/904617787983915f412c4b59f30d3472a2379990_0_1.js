function(key, columns, cf){
  var data = { columns: [], key:key }, col,
      schema = {}, i = 0, len = columns.length;

  //TODO: Implement super columns
  for(; i < len; i += 1){
    col = cf.isCounter ? columns[i].counter_column : columns[i].column;
    data.columns.push( col );
  }

  schema.value_types = {};
  schema.default_value_type = cf.definition.default_validation_class;
  schema.default_name_type = cf.definition.comparator_type;

  if(cf.definition.column_metadata && Array.isArray(cf.definition.column_metadata)){
    i = 0; len = cf.definition.column_metadata.length;
    var item;

    for(; i < len; i += 1){
      item = cf.definition.column_metadata[i];
      schema.value_types[item.name] = item.validation_class;
    }
  }

  // Counters already returned deserialized
  if(cf.isCounter) {
    schema.noDeserialize = true;
  }

  return new Row(data, schema);
}
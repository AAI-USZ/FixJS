function create_element(schema) {
  switch(schema.type) {
    case 'integer':
    case 'string':
    case 'bool':
    assert(schema.hasOwnProperty('value'));
    return schema.value;

    default:
    assert(schema_map.hasOwnProperty(schema.type));
    return create_element(schema_map[schema.type]);

    case 'ber_enum': return [];
    case 'binary': return new ArrayBuffer(0);
    case 'event': return new Event();
    case 'array1d': return Array1D(schema);
    case 'array2d': return Array2D(schema);
  }
}
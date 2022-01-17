function(record, key, value) {
    var attrKey = this.get('key') || key;
    if (value !== undefined) {
      value = this.fromType(record, key, value) ; // convert to attribute.
    } else {
      value = record.readAttribute(attrKey);
      if (SC.none(value) && (value = this.get('defaultValue'))) {
        if (typeof value === SC.T_FUNCTION) {
          value = this.defaultValue(record, key, this);
          // write default value so it doesn't have to be executed again
          if(record.attributes()) record.writeAttribute(attrKey, value, true);
        }
      } else value = this.toType(record, key, value);
    }

    return value ;
  }
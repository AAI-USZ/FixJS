function(v) {
    if (doneParsing === true) {
        return strtok.DONE;
    }

    if (v === undefined) {
        return strtok.UINT8;
    }

    switch (type) {
      case undefined:
        // We're reading the first byte of our type. Either we have a
        // single-byte primitive (we accumulate now), a multi-byte
        // primitive (we set our type and accumulate when we've
        // finished reading the primitive from the stream), or we have a
        // complex type.

        // null/undefined
        if (v === ubjsonTypes.NULL) {
          acc(null);
          break;
        }

        // true
        if (v === ubjsonTypes.TRUE) {
          acc(true);
          break;
        }

        // false
        if (v === ubjsonTypes.FALSE) {
          acc(false);
          break;
        }

        // byte
        if (v === ubjsonTypes.BYTE) {
          type = ubjsonTypes.BYTE;
          return strtok.INT8;
        }

        // int16
        if (v === ubjsonTypes.INT16) {
          type = ubjsonTypes.INT16;
          return strtok.INT16_BE;
        }

        // int32
        if (v === ubjsonTypes.INT32) {
          type = ubjsonTypes.INT32;
          return strtok.INT32_BE;
        }

        // int64
        if (v === ubjsonTypes.INT64) {
          type = ubjsonTypes.INT64;
          return strtok.INT64_BE;
        }

        // float
        if (v === ubjsonTypes.FLOAT) {
          type = ubjsonTypes.FLOAT;
          return strtok.FLOAT_BE;
        }

        // double
        if (v === ubjsonTypes.DOUBLE) {
          type = ubjsonTypes.DOUBLE;
          return strtok.DOUBLE_BE;
        }

        // short huge number
        if (v === ubjsonTypes.SHORTHUGE) {
          type = ubjsonTypes.SHORTHUGE;
          return strtok.UINT8;
        }

        // huge number
        if (v === ubjsonTypes.HUGE) {
          type = ubjsonTypes.HUGE;
          return strtok.UINT32_BE;
        }

        // short string
        if (v === ubjsonTypes.SHORTSTRING) {
          type = ubjsonTypes.SHORTSTRING;
          return strtok.UINT8;
        }

        // string
        if (v === ubjsonTypes.STRING) {
          type = ubjsonTypes.STRING;
          return strtok.UINT32_BE;
        }

        // short array
        if (v === ubjsonTypes.SHORTARRAY) {
          type = ubjsonTypes.SHORTARRAY;
          return strtok.UINT8;
        }

        // array
        if (v === ubjsonTypes.ARRAY) {
          type = ubjsonTypes.ARRAY;
          return strtok.UINT32_BE;
        }

        // short object
        if (v === ubjsonTypes.SHORTOBJECT) {
          type = ubjsonTypes.SHORTOBJECT;
          return strtok.UINT8;
        }

        // object
        if (v === ubjsonTypes.OBJECT) {
          type = ubjsonTypes.OBJECT;
          return strtok.UINT32_BE;
        }

        // unknown-length container end
        if (v === ubjsonTypes.END) {
          acc(null, true);
          break;
        }

        // Unknown type
        // - return Error
        // - finish parsing
        acc(new Error("Cannot parse unknown type marker '" + v + "' (decimal)"));
        return strtok.DONE;

      case ubjsonTypes.BYTE:
      case ubjsonTypes.INT16:
      case ubjsonTypes.INT32:
      case ubjsonTypes.INT64:
      case ubjsonTypes.FLOAT:
      case ubjsonTypes.DOUBLE:
        acc(v);
        type = undefined;
        break;

      case ubjsonTypes.SHORTHUGE:
      case ubjsonTypes.HUGE:
        type = STRINGEND;
        return new strtok.StringType(v, 'utf-8');

      case ubjsonTypes.SHORTSTRING:
      case ubjsonTypes.STRING:
        type = STRINGEND;
        return new strtok.StringType(v, 'utf-8');

      case STRINGEND:
        acc(v.toString());
        type = undefined;
        break;

      case ubjsonTypes.SHORTARRAY:
        if (v === 255) {
          acc = unpackUnknownLengthArray(acc);
        } else {
          acc = unpackArray(v, acc);
        }
        type = undefined;
        break;

      case ubjsonTypes.ARRAY:
        acc = unpackArray(v, acc);
        type = undefined;
        break;

      case ubjsonTypes.SHORTOBJECT:
        if (v === 255) {
          acc = unpackUnknownLengthObject(acc);
        } else {
          acc = unpackObject(v, acc);
        }
        type = undefined;
        break;

      case ubjsonTypes.OBJECT:
        acc = unpackObject(v, acc);
        type = undefined;
        break;
    }

    // We're reading a new primitive; go get it
    return strtok.UINT8;
  }
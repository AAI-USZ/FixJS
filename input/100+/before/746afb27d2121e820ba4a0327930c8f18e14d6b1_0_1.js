function (delta, data) {
    var type = data.value
      , schema = data.schema
      , atomics
      , val
      , obj

    if (type === undefined) {
      if (!delta.$unset) delta.$unset = {};
      delta.$unset[data.path] = 1;

    } else if (type === null) {
      if (!delta.$set) delta.$set = {};
      delta.$set[data.path] = type;

    } else if (type._path && type.doAtomics) {
      // a MongooseArray or MongooseNumber
      atomics = type._atomics;

      var ops = Object.keys(atomics)
        , i = ops.length
        , op;

      while (i--) {
        op = ops[i]

        if (op === '$pushAll' || op === '$pullAll') {
          if (atomics[op].length === 1) {
            val = atomics[op][0];
            delete atomics[op];
            op = op.replace('All', '');
            atomics[op] = val;
          }
        }

        val = atomics[op];
        obj = delta[op] = delta[op] || {};

        if (op === '$pull' || op === '$push') {
          if ('Object' !== val.constructor.name) {
            if (Array.isArray(val)) val = [val];
            // TODO Should we place pull and push casting into the pull and push methods?
            val = schema.cast(val)[0];
          }
        }

        obj[data.path] = isMongooseObject(val)
          ? val.toObject({ depopulate: 1 }) // MongooseArray
          : Array.isArray(val)
            ? val.map(function (mem) {
                return isMongooseObject(mem)
                  ? mem.toObject({ depopulate: 1 })
                  : mem.valueOf
                    ? mem.valueOf()
                    : mem;
              })
            : val.valueOf
              ? val.valueOf() // Numbers
              : val;

        if ('$addToSet' === op) {
          if (val.length > 1) {
            obj[data.path] = { $each: obj[data.path] };
          } else {
            obj[data.path] = obj[data.path][0];
          }
        }
      }
    } else {
      // normalize MongooseArray or MongooseNumber
      if (type instanceof MongooseArray ||
          type instanceof MongooseBuffer) {
        type = type.toObject({ depopulate: 1 });
      } else if (type._path)
        type = type.valueOf();

      if (useSet) {
        if (!('$set' in delta))
          delta['$set'] = {};

        delta['$set'][data.path] = type;
      } else
        delta[data.path] = type;
    }

    return delta;
  }, {}
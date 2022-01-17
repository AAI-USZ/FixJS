function() {
      var i, argument, type, values = [], struct;

      //Verification!
      for (i = 0; i < arguments.length; i++) {
        argument = arguments[i];
        type = this.getMemberType(i);
        switch(typeof argument) {
          case "number":
            //Must be a numeric type
            Util.assert(type in StructDataTypes && type !== 'utf8');
            //Unsigned ints must be positive.
            if (type.charAt(0) === 'u') {
              Util.assert(argument >= 0);
            }

            //Floating point numbers.
            if (argument - Math.floor(argument) !== 0) {
              Util.assert(type === 'float' || type === 'double');
            }

            break;
          case "boolean":
            Util.assert(type === 'u1');
            argument = argument === true ? 1 : 0;
            break;
          case "string":
            Util.assert(type === 'utf8');
            break;
          case "object":
            Util.assert(argument.type.getName() === type);
            break;
          //This should never be called with null or undefined.
          case "null":
          case "undefined":
            throw "Struct.create called with a null or undefined value.";
        }

        values.push(argument);
      }

      return new StructInstantiation(this, values);
    }
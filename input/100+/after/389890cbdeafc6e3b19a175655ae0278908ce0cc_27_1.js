function() {
      var i, argument, type, values = [], struct;

      //Verification!
      for (i = 0; i < arguments.length; i++) {
        argument = arguments[i];
        type = this.getMemberType(i);

        //Booleans are never stored as 'true'/'false' in
        //the class file; they are represented as 0/1.
        //However, we accept them in the Struct creator.
        if (typeof argument === "boolean") {
          Util.assert(type === 'u1');
          argument = argument ? 1 : 0;
        }

        Util.typeValidation(type, argument);
        values.push(argument);
      }

      return new StructInstantiation(this, values);
    }
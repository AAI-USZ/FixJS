function(StructDataTypes, Util) {
    //Stores all structs defined thus far.
    var structs = [];

    function Struct(name, definition) {
      var typeLines = definition.split(';'), regEx = /\w+/g, match,
        i, j, typeLineSplit, word, memberName, memberType, memberNameHash = {};

      Util.assert(typeof name === 'string' && "Name must be a string.");
      Util.assert(!(name in StructDataTypes) && "Invalid struct name: " + name + ". Cannot name a struct after a primitive data type.");
      Util.assert(!(name in structs) && "Struct name must be unique from all other structs.");
      Util.assert(name !== '' && 'Name cannot be empty.');

      //Each 'type' is an array of two strings--
      // First item represents the type of the struct member.
      // Second item represents the name of the struct member.
      this.types = [];
      this.name = name;
      this.flattenedTypes = [];

      for (i = 0; i < typeLines.length; i++) {
        typeLineSplit = [];

        while ((match = regEx.exec(typeLines[i])) !== null) {
          typeLineSplit.push(match[0]);
        }

        //Empty lines are OK.
        if (typeLineSplit.length === 0) continue;

        Util.assert(typeLineSplit.length === 2 && 'Each type line has two elements: A type and a name.');

        memberType = typeLineSplit[0];
        memberName = typeLineSplit[1];

        Util.assert(!(memberName in memberNameHash) && "Struct members should have unique names.");
        memberNameHash[memberName] = 1;

        //Type must be a primitive or existing struct.
        if (memberType in StructDataTypes) {
          //Use the string.
        }
        else if (memberType in structs) {
          memberType = structs[memberType];
        }
        else {
          throw "Could not find type " + memberType + " for struct member " + typeLineSplit[1] + " while processing struct " + name + ".";
        }

        typeLineSplit[0] = memberType;
        this.types.push(typeLineSplit);
      }

      Util.assert(this.types.length > 0 && "A struct must contain types.");
      structs[name] = this;
    }

    /**
     * Static method.
     * Returns an already-created struct with the given name.
     */
    Struct.getStruct = function(name) {
      Util.assert(name in structs);
      return structs[name];
    };

    /**
     * Clears all previously-defined structs. Used for unit tests on this module.
     */
    Struct.prototype._clearStructs = function() {
      structs = [];
    };

    Struct.prototype.getTypes = function() {
      return this.types;
    };

    Struct.prototype.getMemberType = function(idx) {
      Util.assert(this.types.length > idx);
      return this.types[idx][0];
    };

    Struct.prototype.getMemberName = function(idx) {
      Util.assert(this.types.length > idx);
      return this.types[idx][1];
    };

    Struct.prototype.getName = function() {
      return this.name;
    };

    /*Struct.prototype._getFlattenedTypes = function() {
      var i, type, subobjTypes, tempType, j, subobjName;

      //We are guaranteed to have at least 1 type.
      if (this.flattenedTypes.length > 0) {
        return this.flattenedTypes;
      }

      for (i = 0; i < this.types.length; i++) {
        type = this.types[i];
        if (typeof type === 'string') {
          this.flattenedTypes.push(type);
        }
        else {
          subobjTypes = type._getFlattenedTypes();
          subobjName = this.getMemberName(i);
          for (j = 0; j < subobjTypes.length; j++) {
            //Create a new array.
            tempType = [ subobjTypes[j][0], subobjName + "." + subobjTypes[j][1] ];
            this.flattenedTypes.push(tempType);
          }
        }
      }

      return this.flattenedTypes;
    };*/

    /**
     * Create an instance of this struct.
     */
    Struct.prototype.create = function() {
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
    };

    function StructInstantiation(struct, values) {
      this.type = struct;
      this.values = values;
    }

    /**
     * Adds itself to a mock class reader.
     */
    StructInstantiation.prototype.addToClassReader = function(mockClassReader, name) {
      var j, type, val, length, memberName;
      //Prepended to names.
      name = name === undefined ? '' : name + ".";

      for (j = 0; j < this.values.length; j++) {
        val = this.values[j];
        type = this.type.getMemberType(j);
        memberName = name + this.type.getName(j);

        if (type in StructDataTypes) {
          mockClassReader.addField(type, val, memberName);
        }
        else {
          val.addToClassReader(mockClassReader, memberName);
        }
      }
    };

    return Struct;
  }
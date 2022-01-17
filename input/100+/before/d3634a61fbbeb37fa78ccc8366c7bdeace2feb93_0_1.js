function (instr, objType, propName, depth)
{
    if (objType.flags === TypeFlags.ANY)
        throw '*WARNING: getProp on any type';

    // If there are non-object bases
    if (objType.flags & 
        ~(TypeFlags.EXTOBJ  | 
          TypeFlags.UNDEF   | 
          TypeFlags.NULL    |
          TypeFlags.STRING)
        )
        throw '*WARNING: getProp with invalid base';

    // If we have exceeded the maximum lookup depth
    if (depth > 8)
        throw  '*WARNING: maximum prototype chain lookup depth exceeded';

    // Output type set
    var outType = TypeSet.empty;

    //print('depth ' + depth);
    //print('obj type : ' + objType);
    //print('prop name: ' + propName + ' ' + (typeof propName));

    // If the object may be a string
    if (objType.flags & TypeFlags.STRING)
    {
        // If this is the length property
        if (propName === 'length')
        {
            outType = outType.union(TypeSet.posInt);
        }

        // If this is a named property
        else if (typeof propName === 'string')
        {
            // Lookup the property on the string prototype
            var protoProp = this.propLookup(instr, this.strProto, propName, depth + 1);
            outType = outType.union(protoProp);
        }

        // Otherwise, this is an index property
        else
        {
            // This is a substring
            outType = outType.union(TypeSet.string);
        }
    }

    // For each possible object
    for (var objItr = objType.getObjItr(); objItr.valid(); objItr.next())
    {
        var obj = objItr.get();

        // If this is the length property of an array
        if (obj.flags === TypeFlags.ARRAY && propName === 'length')
        {
            outType = outType.union(TypeSet.posInt)
        }

        // Otherwise, for normal properties
        else
        {
            // Get the node for this property
            if (typeof propName === 'string')
                var propNode = this.getPropNode(obj, propName);
            else
                var propNode = obj.idxProp;

            // Get the type for this property node
            var propType = this.getType(instr, propNode)
        
            // If this property may be missing or this is an unbounded array access
            if (propType.flags & TypeFlags.MISSING || propName === false)
            {
                // Get the type for the object's prototype
                var protoNode = obj.proto;
                var protoType = this.getType(instr, protoNode);

                // If the prototype is not necessarily null
                if (protoType.flags & ~TypeFlags.NULL)
                {
                    // Do a recursive lookup on the prototype
                    var protoProp = this.propLookup(instr, protoType, propName, depth + 1);

                    // If we know for sure this property is missing
                    if (propType.flags === TypeFlags.MISSING)
                    {
                        // Take the prototype property type as-is
                        propType = protoProp;
                    }
                    else
                    {
                        // Union the prototype property type
                        propType = propType.union(protoProp);
                    }
                }

                // If the prototype may be null, add the undefined type
                if (protoType.flags & TypeFlags.NULL)
                {
                    propType = propType.union(TypeSet.undef);
                }

                // Remove the missing flag from the property type
                propType = propType.restrict(propType.flags & (~TypeFlags.MISSING));
            }

            // Union the types for this property into the type set
            outType = outType.union(propType);
        }
    }

    //print('depth: ' + depth);
    //print('out type: ' + outType);
    //print('');

    return outType;
}
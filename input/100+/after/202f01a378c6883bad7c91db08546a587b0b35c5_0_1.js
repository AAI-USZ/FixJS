function (
    instr,
    tag, 
    func,
    protoSet, 
    flags, 
    numClosVars, 
    singleton
)
{   
    // By default, the prototype is null
    if (protoSet === undefined)
        protoSet = TypeSet.null;

    // By default, this is a regular object
    if (flags === undefined)
        flags = TypeFlags.OBJECT;

    // By default, no closure variables
    if (numClosVars === undefined)
        numClosVars = 0;

    // By default, not singleton
    if (singleton === undefined)
        singleton = false;

    assert (
        protoSet.flags !== TypeFlags.EMPTY,
        'invalid proto set flags'
    );





    // Create the recent and summary objects
    // The recent object is marked as a singleton
    var recentObj = new TGObject(
        instr,
        tag + '_r',
        func,
        flags,
        numClosVars,
        singleton/*true*/ // TODO
    );
    var summaryObj = new TGObject(
        instr,
        tag + '_s',
        func,
        flags,
        numClosVars,
        singleton
    );

    assert (
        recentObj !== summaryObj,
        'recent and summary objects are the same'
    );

    // Set the prototype set for the objects
    this.setType(instr, recentObj.proto, protoSet);
    this.setType(instr, summaryObj.proto, protoSet);

    // For each named property of the recent object
    for (propName in recentObj.props)
    {
        var rcntProp = recentObj.getPropNode(propName);
        var summProp = summaryObj.getPropNode(propName);

        var rcntType = this.getType(instr, rcntProp);
        var summType = this.getType(instr, summProp);

        // Union recent type into summary prop type
        this.setType(instr, summProp, summType.union(rcntType));

        // Initialize the recent property to missing
        // This is so non-existent properties show as undefined
        this.setType(instr, rcntProp, TypeSet.missing);

        //print('init: ' + rcntProp);
        //print('  ' + instr);
    }

    // Union the recent indexed property type into the summary type
    var rcntIdxType = this.getType(instr, recentObj.idxProp);
    var summIdxType = this.getType(instr, summaryObj.idxProp);
    this.setType(instr, summaryObj.idxProp, summIdxType.union(rcntIdxType));

    // Create a set on the instruction for values possibly having
    // the recent object in their type set
    if (instr.recentVals === undefined)
        instr.recentVals = new HashSet();

    // For each value possibly using the recent object
    for (var itr = instr.recentVals.getItr(); itr.valid(); itr.next())
    {
        var value = itr.get();

        // Get the input type for the value
        var inType = this.getType(instr, value);

        var outType = inType;

        // If the value type contains the recent object
        if (value.hasObj(recentObj) === true)
        {
            print('translating ref');

            var outType = new TypeSet(
                inType.flags,
                inType.rangeMin,
                inType.rangeMax,
                inType.strVal
            );

            // Replace occurrences of the recent object by the summary object
            for (var objItr = value.getObjItr(); objItr.valid(); objItr.next())
            {
                var obj = objItr.get();

                if (obj === recentObj)
                    obj = summaryObj;

                outType.addObj(obj);
            }
        }

        this.setType(instr, value, outType);
    }






    // Return a type set containing only the recent object
    return new TypeSet(
        flags,
        undefined,
        undefined,
        undefined,
        recentObj
    );
}
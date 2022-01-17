function (irInstr, useIdx)
{
    assert (
        irInstr instanceof IRInstr,
        'invalid IR instruction'
    );

    assert (
        useIdx === undefined || useIdx < irInstr.uses.length,
        'invalid use index'
    );

    // Find the instruction in the instruction map    
    var instr = this.instrMap.get(irInstr);

    // If the instruction wasn't analyzed, no info available
    if (instr === HashMap.NOT_FOUND)
        return null;

    if (useIdx !== undefined)
    {
        // Get the input type
        var typeSet = this.getInType(instr, useIdx);
    }
    else
    {
        // Store the type set of the output value   
        var outVals = instr.outVals[0];
        var typeSet = TypeSet.empty;
        for (var i = 0; i < outVals.length; ++i)
        {
            var def = outVals[i];

            if (def.value === irInstr)
            {
                //print('  output: ' + def.type);
                typeSet = def.type;
                break;
            }
        }
    }

    return typeSet;
}
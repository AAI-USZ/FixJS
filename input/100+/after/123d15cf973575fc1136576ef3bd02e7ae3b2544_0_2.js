function (instr, value, type, targetIdx)
{
    //if (String(value) === 'k')
    //    print('setting type: ' + type);

    if (targetIdx === undefined)
        targetIdx = 0;

    assert (
        instr instanceof SPSTFInstr,
        'invalid instruction object'
    );

    assert (
        value instanceof IRInstr ||
        value instanceof TGProperty ||
        value instanceof TGVariable,
        'invalid value'
    );

    assert (
        type instanceof TypeSet,
        'invalid type'
    );

    assert (
        targetIdx === 0 || targetIdx < instr.targets.length,
        'invalid target index'
    );

    // Get the list of definitions for this target
    var defList = instr.outVals[targetIdx];

    // Try to find the definition for this value in the list
    var def = undefined;
    for (var j = 0; j < defList.length; ++j)        
    {
        if (defList[j].value === value)
        {
            def = defList[j];
            break;
        }
    }

    // If this is a new definition
    if (def === undefined)
    {
        // Create a new definition object
        var def = {
            value: value,
            type: TypeSet.empty,
            dests: [],
            instr: instr
        }

        // Add the new definition to the list for this target
        defList.push(def);

        // Add the definition to the function's definition set
        this.addFuncDef(instr.block.func, value);

        // Kill all uses of this value, starting from this block
        this.killUses(instr.block, value);

        // Queue this instruction's block for live value analysis
        this.queueBlock(instr.block, value);
    }

    // If the type hasn't changed, do nothing
    if (def.type.equal(type) === true)
        return;

    // Update the definition type
    def.type = type;

    // If the type set contains objects
    if ((type.flags & TypeFlags.EXTOBJ) !== 0 && type.getNumObjs() > 0)
    {
        // For each object
        for (var itr = type.getObjItr(); itr.valid(); itr.next())
        {
            var obj = itr.get();
            var origin = obj.origin;

            // If this is not a recent object, skip it
            if (obj.singleton === false)
                continue;

            // If the origin does not track recent values, skip it
            if (origin.recentVals === undefined)
                continue;
           
            // If this is a local variable from a different function
            // than the object's origin, skip it
            if (value instanceof IRValue && value.parentBlock instanceof BasicBlock &&
                value.parentBlock.parentCFG.ownerFunc !== origin.block.func.irFunc)
                continue;

            // If the origin already defines this value, skip it
            if (this.hasOutDef(origin, value) === true)
                continue;

            // Add the value to the list of recent values
            // and queue the object's origin instruction
            origin.recentVals.add(value);
            this.queueInstr(origin);
        }
    }

    // Queue all the destination instructions
    for (i = 0; i < def.dests.length; ++i)
    {
        var dest = def.dests[i];

        var newType = dest.type.union(type);

        // If the destination type changed
        if (newType.equal(dest.type) === false)
        {
            // Store the updated type
            dest.type = newType; 

            // Queue the destination instruction
            this.queueInstr(dest.instr);
        }
    }
}
function (use, visited)
{
    var workList = new LinkedList();

    visited = new HashSet();

    var ta = this;

    // Reset the definitions of an instruction
    function resetDefs(instr)
    {
        // For each target
        for (var targetIdx = 0; targetIdx < instr.outVals.length; ++targetIdx)
        {
            var defs = instr.outVals[targetIdx];

            // For each definition
            for (var defIdx = 0; defIdx < defs.length; ++defIdx)
            {
                var def = defs[defIdx];

                // If this is a property initialization, skip it
                if (def.value instanceof TGProperty &&
                    def.value.parent.origin === instr)
                    continue;

                // Reset the definition type
                def.type = TypeSet.empty;

                // Add all destinations to the work list
                for (var i = 0; i < def.dests.length; ++i)
                    workList.addLast(def.dests[i]);
            }
        }
    }

    /*
    // Remove all definitions for a given instruction
    function removeDefs(instr)
    {
        // For each target
        for (var targetIdx = 0; targetIdx < instr.outVals.length; ++targetIdx)
        {
            var defs = instr.outVals[targetIdx];

            // For each definition
            for (var defIdx = 0; defIdx < defs.length; ++defIdx)
            {
                var def = defs[defIdx];

                // Remove all outgoing edges
                for (var i = 0; i < def.dests.length; ++i)
                {
                    var dest = def.dests[i];

                    arraySetRem(dest.srcs, def);
                    ta.numEdges--;

                    workList.addLast(dest);
                }

                // Queue the definition block for analysis
                ta.queueBlock(instr.block, def.value);
            }

            // Remove all definitions for this instruction
            instr.outVals[targetIdx] = [];
        }
    }
    */

    // Reset a call instruction
    function resetCall(instr, use)
    {
        var irInstr = instr.irInstr;

        var useIndex;
        for (var i = 0; i < instr.inVals.length; ++i)
            if (instr.inVals[i].value === use.value)
                useIndex = i;

        if (useIndex === undefined)
            return;

        // Compute the call argument index
        var argIndex = (irInstr instanceof JSNewInstr)? (useIndex-1):useIndex;

        // For each target
        for (var targetIdx = 0; targetIdx < instr.outVals.length; ++targetIdx)
        {
            var defs = instr.outVals[targetIdx];

            // For each definition
            for (var defIdx = 0; defIdx < defs.length; ++defIdx)
            {
                var def = defs[defIdx];

                // If this is not the argument definition, skip it
                if (def.value.argIndex !== argIndex &&
                    def.value.name !== 'idxArg')
                    continue;

                // Reset the definition type
                def.type = TypeSet.empty;

                // Add all destinations to the work list
                for (var i = 0; i < def.dests.length; ++i)
                    workList.addLast(def.dests[i]);
            }
        }
    }

    // Add the use to the work list
    workList.addLast(use);

    // Until the work list is empty
    while (workList.isEmpty() === false)
    {
        var use = workList.remFirst();
        var instr = use.instr;
        var irInstr = instr.irInstr;

        // If this use was already visited, skip it
        if (visited.has(use) === true)
            continue;

        // Mark the use as visited
        visited.add(use);

        // If this is a call instruction
        if (irInstr instanceof JSCallInstr || 
            irInstr instanceof JSNewInstr)
        {
            resetCall(instr, use);
        }

        // Other kinds of instructions
        else
        {
            resetDefs(instr);
        }
    }

    // For each visited use
    for (var itr = visited.getItr(); itr.valid(); itr.next())
    {
        var use = itr.get();

        this.queueInstr(use.instr);

        // Don't remove objects from the set of objects touched by
        // property write instructions
        if (use.instr.irInstr instanceof PutPropInstr &&
            use.value === use.instr.irInstr.uses[0])
            continue;
        
        // Recompute the type for this use
        use.type = TypeSet.empty;
        for (var i = 0; i < use.srcs.length; ++i)
        {
            var src = use.srcs[i];
            use.type = use.type.union(src.type);
        }
    }
}
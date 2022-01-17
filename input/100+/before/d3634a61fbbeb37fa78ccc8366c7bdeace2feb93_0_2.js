function (ta)
{
    // Get the type set for the callee
    var calleeType = ta.getInType(this, 0);

    // If the callee could be any function
    if (calleeType.flags === TypeFlags.ANY)
    {
        if (config.verbosity >= log.DEBUG)
            print('*WARNING: callee has type ' + calleeType);

        ta.setOutType(this, TypeSet.any);

        // Mark the call successors as reachable
        for (var i = 0; i < this.targets.length; ++i)
            ta.touchTarget(this, i);

        // No callees to analyze
        return;
    }

    // Test if this is a new/constructor call
    var isNew = (this.irInstr instanceof JSNewInstr);

    // If this is a regular function call
    if (isNew === false)
    {
        // Get the this argument call
        var thisType = ta.getInType(this, 1);
    }
    else
    {
        // Lookup the "prototype" property of the callee
        var protoType = ta.propLookup(this, calleeType, 'prototype', 0);

        // If the prototype type is not yet resolved
        if (protoType === TypeSet.empty)
        {
            var thisType = TypeSet.empty;
        }
        else
        {
            // If the prototype may not be an object
            if (protoType.flags & (~TypeFlags.EXTOBJ))
            {
                // Exclude non-objects and include the object prototype object
                protoType = protoType.restrict(protoType.flags & (~TypeFlags.EXTOBJ));
                protoType = protoType.union(ta.objProto);
            }

            // Create a new object to use as the this argument
            var thisType = ta.newObject(this, 'new_obj', undefined, protoType);
        }
    }

    // If there are no callees, get all argument types,
    // this prevents type assetions from failing
    // TODO: create pseudo TypeAssert function?
    if (calleeType.getNumObjs() === 0)
    {
        for (var i = 0; i < this.irInstr.uses.length; ++i)
            ta.getInType(this, i);
    }

    // Mark the call successors as reachable
    for (var i = 0; i < this.targets.length; ++i)
        ta.touchTarget(this, i);

    // Get the call continuation block
    var callCont = this.targets[0];

    // For each potential callee
    for (var itr = calleeType.getObjItr(); itr.valid(); itr.next())
    {
        var callee = itr.get();

        // If this is not a function, ignore it
        if ((callee.func instanceof IRFunction) === false)
            continue;

        // Get the SPSTFFunc instance for this value
        var irFunc = callee.func;
        var func = ta.getFunc(irFunc);

        // If this function is a new callee
        if (arraySetHas(this.callees, func) === false)
        {
            // Add the function to the callee set
            arraySetAdd(this.callees, func);

            // Add this instruction to the set of callers of the function
            arraySetAdd(func.callSites, this);

            // Queue the call site block for all live values at the function entry
            for (var liveItr = func.entry.liveMap.getItr(); liveItr.valid(); liveItr.next())
                ta.queueBlock(this.block, liveItr.get().key);

            // Queue the return blocks for all values live in the call continuation
            if (callCont instanceof SPSTFBlock)
            {
                for (var liveItr = callCont.liveMap.getItr(); liveItr.valid(); liveItr.next())
                {
                    var value = liveItr.get().key;
                    for (var i = 0; i < func.retBlocks.length; ++i)
                        ta.queueBlock(func.retBlocks[i], value);
                }
            }

            // Queue the return instructions
            for (var i = 0; i < func.retBlocks.length; ++i)
            {
                var retInstr = func.retBlocks[i].getBranch();
                ta.queueInstr(retInstr, value);
            }

            // Add the callee's definitions to the caller's definitions
            var caller = this.block.func;
            for (var defItr = func.defSet.getItr(); defItr.valid(); defItr.next())
                ta.addFuncDef(caller, defItr.get());

            // Set the call type flags
            if (isNew === true)
                func.ctorCall = true;
            else
                func.normalCall = true;
        }

        // For each argument used by the function
        for (var i = 0; i < func.argVals.length; ++i)
        {
            var argType;

            // Get the incoming type for this argument
            if (i === 0)
            {
                argType = ta.getInType(this, 0);
            }
            else if (i === 1)
            {
                argType = thisType;
            }
            else
            {
                var useIdx = (isNew === true)? (i-1):i;

                if (useIdx >= this.irInstr.uses.length)
                    argType = TypeSet.undef;
                else
                    argType = ta.getInType(this, useIdx);
            }

            // Set the type for this argument value
            ta.setType(this, func.argVals[i], argType);
        }

        // If the callee uses the arguments object
        if (irFunc.usesArguments === true)
        {
            // Indexed argument type
            var idxArgType = TypeSet.empty;

            // For each argument passed
            for (var i = (isNew? 1:2); i < this.irInstr.uses.length; ++i)
            {
                var argType = ta.getInType(this, i);
                idxArgType = idxArgType.union(argType);
            }

            // Set the indexed argument type
            ta.setType(this, func.idxArgVal, idxArgType)
        }
    }

    // Restrict the callee type in the continuation to functions
    var newCalleeType = calleeType.restrict(TypeFlags.FUNCTION);        
    ta.setInType(this, 0, newCalleeType, calleeType);
}
function (irFunc)
{
    assert (
        irFunc instanceof IRFunction,
        'expected IR function'
    );

    // Check if a representation has already been created for this function
    var func = this.funcMap.get(irFunc);

    // If no representation has yet been created
    if (func === HashMap.NOT_FOUND)
    {
        // Construct function representation
        var func = new SPSTFFunc(irFunc, 0, func);

        // Queue the function's entry block
        var entry = this.getBlock(new SPSTFStump(irFunc.hirCFG.entry), func);

        // Create the function entry pseudo-instruction and move it
        // at the start of the block
        var entryInstr = this.makeInstr(
            new SPSTFEntryInstr(),
            entry
        );
        entry.instrs.pop();
        entry.instrs.unshift(entryInstr);

        // Set the function entry block
        func.entry = entry;

        // Add the function to the function map
        this.funcMap.set(irFunc, func);
    }

    // Return the function representation
    return func;
}
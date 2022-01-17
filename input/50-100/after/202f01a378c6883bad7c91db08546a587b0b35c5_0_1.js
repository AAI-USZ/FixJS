function (obj, propName)
{
    // If the property node does not already exist
    if (obj.hasPropNode(propName) === false)
    {
        var propNode = obj.getPropNode(propName);

        var origInstr = obj.origin;

        assert (
            origInstr instanceof SPSTFInstr,
            'invalid origin instruction'
        );

        // TODO: modify getPropNode to queue init instr when node doesn't exist
        //       and not create missing def

        // Assign the missing type to the property at the object
        // creation site. This is because object properties do not
        // exist at object creation time
        //this.setType(origInstr, propNode, TypeSet.missing);

        // Queue the creation site so that it will initialize
        // the new property to the missing type
        this.queueInstr(origInstr);

        //print('creating init def for: "' + propName + '"');
        //print('  orig instr: ' + origInstr);
    }

    return obj.getPropNode(propName);
}
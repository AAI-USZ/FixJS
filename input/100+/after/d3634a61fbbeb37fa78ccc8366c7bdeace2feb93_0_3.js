function (ta)
{
    var callee = this.irInstr.uses[0];

    // Return type (by default, any type)
    var retType = TypeSet.any;

    // If we cannot determine the callee
    if ((callee instanceof IRFunction) === false)
    {
        // Do nothing
    }

    // Creates the 'arguments' object
    else if (callee.funcName === 'makeArgObj')
    {
        var func = this.block.func;

        // Create the arguments object
        var argObjType = ta.newObject(
            this,
            'arg_obj',
            undefined,
            ta.objProto
        );
        var argObj = argObjType.getObjItr().get();

        // Set the arguments length value
        var lengthNode = ta.getPropNode(argObj, 'length');
        ta.setType(this, lengthNode, TypeSet.posInt);

        // TODO: callee property

        // Get the type of the indexed function argument value
        var idxArgType = ta.getType(this, func.idxArgVal);

        // Set the indexed property type of the argument object
        ta.setType(this, argObj.idxProp, idxArgType);

        retType = argObjType;
    }

    // Closure object creation
    else if (callee.funcName === 'makeClos')
    {
        //print('makeClos');

        var func = this.irInstr.uses[3];
        var numClosCells = this.irInstr.uses[4].value;

        //print(this);

        assert (
            func instanceof IRFunction,
            'closure of unknown function'
        );

        assert (
            isNonNegInt(numClosCells),
            'invalid num clos cells'
        );

        // Test if this is a global function declaration (not in a loop)
        var globalFunc = false;
        var curBlock = this.irInstr.parentBlock;
        if (curBlock instanceof BasicBlock)
        {
            var curFunc = curBlock.parentCFG.ownerFunc;
            var curEntry = curFunc.hirCFG.entry;
            var globalFunc = curFunc.parentFunc === null && curBlock === curEntry;
        }

        // Create an object node for this function
        var funcObj = ta.newObject(
            this,
            'closure',
            func,
            ta.funcProto, 
            TypeFlags.FUNCTION, 
            numClosCells,
            globalFunc
        );

        // Create a Function.prototype object for the function
        var protoObj = ta.newObject(
            this,
            'proto',
            undefined,
            ta.objProto,
            undefined,
            undefined,
            globalFunc
        );

        // Assign the prototype object to the Function.prototype property
        var protoNode = ta.getPropNode(funcObj.getObjItr().get(), 'prototype');
        ta.setType(this, protoNode, protoObj);

        retType = funcObj;
    }

    // Closure cell creation
    else if (callee.funcName === 'makeCell')
    {
        //print('makeCell');
        //print(this);

        var newCell = new TGClosCell(this.irInstr);

        var cellType = new TypeSet(
            TypeFlags.CELL,
            undefined,
            undefined,
            undefined,
            newCell
        );

        retType = cellType;
    }

    // Get object prototype
    else if (callee.funcName === 'get_ctx_objproto')
    {
        retType = ta.objProto;
    }

    // Get array prototype
    else if (callee.funcName === 'get_ctx_arrproto')
    {
        retType = ta.arrProto;
    }

    // Get function prototype
    else if (callee.funcName === 'get_ctx_funcproto')
    {
        retType = ta.funcProto;
    }

    // Get boolean prototype
    else if (callee.funcName === 'get_ctx_boolproto')
    {
        retType = ta.boolProto;
    }

    // Get number prototype
    else if (callee.funcName === 'get_ctx_numproto')
    {
        retType = ta.numProto;
    }

    // Get string prototype
    else if (callee.funcName === 'get_ctx_strproto')
    {
        retType = ta.strProto;
    }

    // Set closure cell variable
    else if (callee.funcName === 'set_clos_cells')
    {
        var closType = ta.getInType(this, 3);
        var cellIdx = this.irInstr.uses[4].value;
        var valType = ta.getInType(this, 5);

        if (closType === TypeSet.any)
            print('*WARNING: set_clos_cells on any type');

        // For each possible closure
        for (var itr = closType.getObjItr(); itr.valid(); itr.next())
        {
            var clos = itr.get();

            assert (
                cellIdx < clos.closVars.length,
                'invalid clos var index: ' + cellIdx + 
                ' (' + clos.closVars.length + ')'
            );

            var varNode = clos.closVars[cellIdx];

            var curType = ta.getType(this, varNode);
            curType = curType.union(valType);
            ta.setType(this, varNode, curType);
        }

        retType = TypeSet.empty;
    }

    // Get closure cell variable
    else if (callee.funcName === 'get_clos_cells')
    {
        var closType = ta.getInType(this, 3);
        var cellIdx = this.irInstr.uses[4].value;

        var outType = (closType === TypeSet.any)? TypeSet.any:TypeSet.empty;

        // For each possible closure
        for (var itr = closType.getObjItr(); itr.valid(); itr.next())
        {
            var clos = itr.get();

            assert (
                cellIdx < clos.closVars.length,
                'invalid clos var index: ' + cellIdx + 
                ' (' + clos.closVars.length + ')'
            );

            var varNode = clos.closVars[cellIdx];
            var varType = ta.getType(this, varNode);

            outType = outType.union(varType);
        }

        retType = outType;
    }

    // Set closure cell value
    else if (callee.funcName === 'set_cell_val')
    {
        var cellType = ta.getInType(this, 3);
        var valType = ta.getInType(this, 4);

        //print('set_cell_val');
        //print(this);

        assert (
            (cellType.flags & ~TypeFlags.CELL) === 0,
            'invalid closure cell type: ' + cellType
        );

        // For each possible cell
        for (var itr = cellType.getObjItr(); itr.valid(); itr.next())
        {
            var cell = itr.get();
            var varNode = cell.value;

            var curType = ta.getType(this, varNode);
            curType = curType.union(valType);
            ta.setType(this, varNode, curType);
        }

        retType = TypeSet.empty;
    }

    // Get closure cell value
    else if (callee.funcName === 'get_cell_val')
    {
        var cellType = ta.getInType(this, 3);

        //print('get_cell_val');
        //print(this);

        // If the cell type is not unknown
        if (cellType.flags !== TypeFlags.ANY)
        {
            assert (
                (cellType.flags & ~TypeFlags.CELL) === 0,
                'invalid closure cell type: ' + cellType
            );

            var outType = TypeSet.empty;

            // For each possible cell
            for (var itr = cellType.getObjItr(); itr.valid(); itr.next())
            {
                var cell = itr.get();
                var varType = ta.getType(this, cell.value);

                outType = outType.union(varType);
            }

            retType = outType;
        }
    }

    // Box an integer
    else if (callee.funcName === 'boxInt')
    {
        retType = TypeSet.posInt;
    }

    // Box value to boolean conversion
    else if (callee.funcName === 'boxToBool')
    {
        var val = ta.getInType(this, 2);

        if (val.flags === TypeFlags.TRUE || val.flags === TypeFlags.FALSE)
            retType = val;
        else
            retType = TypeSet.bool;
    }

    // Box value to string conversion
    else if (callee.funcName === 'boxToString')
    {
        var valType = ta.getInType(this, 2);

        if (valType.flags === TypeFlags.STRING)
            retType = valType;
        else
            retType = TypeSet.string;
    }

    // Test if a value is the global object
    else if (callee.funcName === 'isGlobalObj')
    {
        var valType = ta.getInType(this, 2);

        if (valType.getNumObjs() === 1)
        {
            if (valType.getObjItr().get() === ta.globalObj)
                retType = TypeSet.true;
            else
                retType = TypeSet.false;
        }
        else
        {
            retType = TypeSet.bool;
        }
    }

    // Throw an exception
    else if (callee.funcName === 'throwExc')
    {
        // The output of this function is never used
        retType = TypeSet.empty;
    }

    // Unknown primitive
    else
    {
        //print('unknown primitive: ' + callee.funcName);
    }

    // Set our own output type
    ta.setOutType(this, retType);

    // Mark the successors as reachable
    for (var i = 0; i < this.targets.length; ++i)
        ta.touchTarget(this, i);
}
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

                // Reset the definition type
                def.type = TypeSet.empty;

                // Add all destinations to the work list
                for (var i = 0; i < def.dests.length; ++i)
                    workList.addLast(def.dests[i]);
            }
        }
    }
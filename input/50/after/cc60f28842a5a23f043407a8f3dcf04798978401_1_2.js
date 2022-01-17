function() {
        return tm.createAttributeRow("localTypeSelection", tm.choices['local'], "localTable", 
                                     tm.handleNewAttribute("localTypeSelection",
                                                           "TreeFlags",
                                                           "localTable", 
                                                           "localCount", tm.choices['local']));
    }
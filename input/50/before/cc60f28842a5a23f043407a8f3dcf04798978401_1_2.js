function() {
        return tm.createAttributeRow("localTypeSelection", tm.choices['local'], "localTable", 
                                     tm.handleNewAttribute("localTypeSelection", tm.choices['local'],
                                                           "TreeFlags",
                                                           "localTable", 
                                                           "localCount"));
    }
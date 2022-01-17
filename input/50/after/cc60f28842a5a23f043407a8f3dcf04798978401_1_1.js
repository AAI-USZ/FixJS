function() {
        return tm.createAttributeRow("actionTypeSelection", tm.choices['action'], "actionTable",
                                     tm.handleNewAttribute("actionTypeSelection", 
                                                           "TreeAction", 
                                                           "actionTable",
                                                           "actionCount", tm.choices['action']));
    }
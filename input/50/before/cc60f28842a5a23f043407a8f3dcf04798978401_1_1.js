function() {
        return tm.createAttributeRow("actionTypeSelection", tm.choices['action'], "actionTable",
                                     tm.handleNewAttribute("actionTypeSelection", tm.choices['action'],
                                                           "TreeAction", 
                                                           "actionTable",
                                                           "actionCount"));
    }
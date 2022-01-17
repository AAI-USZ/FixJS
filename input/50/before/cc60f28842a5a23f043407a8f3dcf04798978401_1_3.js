function() {
        return tm.createAttributeRow("hazardTypeSelection", tm.choices['alert'], "hazardTable", 
                                     tm.handleNewAttribute("hazardTypeSelection", tm.choices['alert'],
                                                           "TreeAlert",
                                                           "hazardTable",
                                                           "hazardCount"));
    }
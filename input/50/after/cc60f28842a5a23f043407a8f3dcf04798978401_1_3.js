function() {
        return tm.createAttributeRow("hazardTypeSelection", tm.choices['alert'], "hazardTable", 
                                     tm.handleNewAttribute("hazardTypeSelection",
                                                           "TreeAlert",
                                                           "hazardTable",
                                                           "hazardCount", tm.choices['alert']));
    }
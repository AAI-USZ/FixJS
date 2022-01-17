function () {

		resetValidations();
	
		var dataFile = validateDataFile();

		var edgeLength = validateEdgeLength();

		var advancedIntegers = validateAdvancedIntegers();
        
        populateProperty();    
    
        return dataFile && edgeLength && advancedIntegers
    }
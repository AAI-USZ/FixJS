function () {

		//Reset any previous validation messages.
		resetValidations();
	
		var dataFile = validateDataFile();

		var edgeLength = validateEdgeLength();

		var advancedIntegers = validateAdvancedIntegers();
        
        //Read the configuration data (added by the user) from the hidden field
        //'alreadyAddedHidden' and populate form element to submit.
        populateProperty();    
    
    	//Check the validation booleans from every validators above and proceed
    	//ahead only if all are 'true'.
        return dataFile && edgeLength && advancedIntegers;
    }
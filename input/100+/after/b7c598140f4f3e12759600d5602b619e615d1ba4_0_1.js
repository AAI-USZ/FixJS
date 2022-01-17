function(){

	//Invoke the colour pickers.
    $('#id_textLabel').miniColors();
	$('#xColourHEX').miniColors();
	
	//Invoke the tool-tips.
	$(".tooltip").tipTip({maxWidth: "250px"});

	//Show the override box input (which is hidden otherwise) if the cookie
	//data from the view has the 'override-edge' box checked.
	if($("#id_overrideEdge").is(":checked")){
		toggleShowOverrideInput();
	}

    $("#id_overrideEdge").click(function () { 
        toggleShowOverrideInput();
    });
    
    $("#settingsLabel").click(function () { 
        toggleShowMainSettings();
    });
    
    $('#advancedLabel').click(function () {
        toggleShowAdvanced();
    });
    
    $('#configLabel').click(function () {
        toggleShowConfig();
    });
    
    //Following are event handlers for different buttons in the configurations'
    //fieldsets.
    $('#xColourButton').click(function () {
        addColour();
        return false;
    });
    
    $('#xThresholdButton').click(function () {

		if(validateConfig('threshold')){ 
			//Request is processed only if the data is found to be valid.
        	addThreshold();
		}
        return false;
    });
    
    $('#xCustomButton').click(function () {
        addCustom();
        return false;
    });    
    
    $('#xClusteringButton').click(function (){
        addClustering();
        return false;
    });
    
    $('#xSizeButton').click(function (){
        addSize();
        return false;
    });
    
    $('#xMaxNodeSizeButton').click(function (){

		if(validateConfig('maxNodeSize')){
        	addMaxNodeSize();
		}
		return false;
    });
    
    $('#xSumButton').click(function (){
        addSum();
        return false;
    });
    
    //Change the type of configuration input, if the radio in the configurations
    //panel has any action.
    $('input[name=xConfigType]').change(function() {
    
        if($('input[name=xConfigType]:checked').val() == "manual"){
        
            $("#customConfig").hide();
            
            $("#manualConfig").fadeToggle(400);
        
        }else{
        
            $("#manualConfig").hide();
        
            $("#customConfig").fadeToggle(400);
        }
    
    });

    
	//Set up a listener for the submit of the main form.    
    $('#renderMainForm').submit(function () {

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
    });
    
}
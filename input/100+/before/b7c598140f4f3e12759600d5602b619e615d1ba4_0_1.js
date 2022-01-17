function(){

    $('#id_textLabel').miniColors();
    
	$('#xColourHEX').miniColors();
	
	$(".tooltip").tipTip({maxWidth: "250px"});

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
    
    $('#xColourButton').click(function () {
        addColour();
        
        return false;
    });
    
    $('#xThresholdButton').click(function () {

		if(validateConfig('threshold')){
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
    
    $('input[name=xConfigType]').change(function() {
    
        if($('input[name=xConfigType]:checked').val() == "manual"){
        
            $("#customConfig").hide();
            
            $("#manualConfig").fadeToggle(400);
        
        }else{
        
            $("#manualConfig").hide();
        
            $("#customConfig").fadeToggle(400);
        }
    
    });

    
    
    $('#renderMainForm').submit(function () {

		resetValidations();
	
		var dataFile = validateDataFile();

		var edgeLength = validateEdgeLength();

		var advancedIntegers = validateAdvancedIntegers();
        
        populateProperty();    
    
        return dataFile && edgeLength && advancedIntegers
    });
    
}
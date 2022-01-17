function () {


     // Also generate a textEditorComponent
     
     var popupTextEditor = Dashboards.getComponent("popupTextEditorComponent");
     if (!popupTextEditor) {
        popupTextEditor = {
            name: "popupTextEditorComponent", 
            type: "popupTextEditor", 
            file: undefined, // will be set later
            saveCallback: function(){
             // We want to refresh CDV
                $.ajax({
                    url: "refreshTests",
                    type: "GET",
                    async: true,
                    success: function(){
                        Dashboards.fireChange("editorFileSaved","xxx");
                    }
                })
            }
        };
        // Call cdf comp
        Dashboards.addComponents([popupTextEditor]);
        popupTextEditor.update();
    }


    var txt = 'New Test name: <input id="testName" type="text" placeholder="newTest"></input>';                                                            
    var callBackFunction = function (v,m,f) {
        if(v !== undefined){
            if (v === "ok"){                                
                var newFileName = m.children()[0].value;     
                                
                if (newFileName.length == 0) {
                    alert("Please enter a file name");
                } else {
                    $.ajax({
                        url: "newTest",
                        data: {newName: newFileName},
                        type: "GET",
                        async: true,
                        success: function(response){
                            if (response && response.success == "true") {

                                popupTextEditor.setFile(response.path);
                                popupTextEditor.update();
                                popupTextEditor.show();                            
                            } else {
                                alert("Error while creating new test");
                            }  
                        }
                    });                                                        
                }
			}	
		}
    };

    var promptConfig = {
        callback: callBackFunction,
        buttons: {
            Cancel: 'cancel'
        },
        loaded: function(){}
    };
        
    promptConfig.buttons['New'] = "ok";    
    $.prompt(txt,promptConfig);                                                            
}
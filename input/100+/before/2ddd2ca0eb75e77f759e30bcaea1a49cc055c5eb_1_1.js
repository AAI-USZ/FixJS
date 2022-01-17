function(newObj) {
							if(newObj !== null) {	// replace
								var endString = " created";
								 if(typeof obj["____"+ltr] !== "undefined" && obj["____"+ltr] != null) {
									 var variable = obj["____"+ltr];

									 switch(variable.category) {
										 case "Gen":
											 Gibber.genReplace(variable, newObj);
										 break;
										 case "Mod":
											 Gibber.modReplace(variable, newObj);
										 break;
										 case "FX":
											 Gibber.fxReplace(variable, newObj);
										 break;
										 case "control":
											 Gibber.controlReplace(variable, newObj);
											 break;
										 case "complex":
											//console.log("Replacing " + variable.name);
											variable.replace(newObj); // rely on object prototype to handle removing members
										 break;
										 default: break;
									 }
								 }
								 if(newObj.name != undefined)
								 	G.log(newObj.name + endString);
							 
							 }else{		// kill
								 //console.log("killing");
								 if(typeof obj["____"+ltr] !== "undefined") {
									 var variable = obj["____"+ltr];
									 if(variable != null) {
										 if(variable.kill != undefined) {
											 variable.kill();
										 }
									 }
								 }
							 }
						 	 obj["____"+ltr] = newObj;
						}
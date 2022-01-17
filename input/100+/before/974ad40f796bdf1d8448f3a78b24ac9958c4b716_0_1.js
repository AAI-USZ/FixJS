function(args) {
						if (!args || !Runtime.currentEditor || Runtime.currentEditor.declaredClass != "davinci.review.editor.ReviewEditor") { 
							return; 
						}
						var state = args.newState || "Normal";
						var dv = userWindow.davinci;
						if(dv && dv.states && dv.states.setState){
							dv.states.setState(state, args.stateContainerNode);
							// Re-publish at the application level
							var newArgs = dojo.clone(args);
							newArgs.editorClass = "davinci.review.editor.ReviewEditor";
							connect.publish("/maqetta/appstates/state/changed", [newArgs]);
						}
					}
function(args) {
						if (!args || !Runtime.currentEditor || Runtime.currentEditor.declaredClass != "davinci.review.editor.ReviewEditor") { 
							return; 
						}
						var state = args.newState || "Normal";
						var dv = userWindow.davinci;
						if(dv && dv.states && dv.states.setState){
/*FIXME: Shouldn't be necessary - event was spawned because state just changed. No need to change it again.
							dv.states.setState(state, args.stateContainerNode, { focus:true, silent:true, updateWhenCurrent:true });
*/
							if (this._commentView) {
								this._commentView.updateStatesScenes();
							}							
							// Re-publish at the application level
							var newArgs = dojo.clone(args);
							newArgs.editorClass = "davinci.review.editor.ReviewEditor";
							connect.publish("/maqetta/appstates/state/changed", [newArgs]);
						}
					}
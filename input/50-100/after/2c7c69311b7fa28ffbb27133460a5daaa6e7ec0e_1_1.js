function removeHandler(e){		
							//console.log("remove event", e);
							// return;

							var newTargetIsHandle = e.relatedTarget == handle;
							var newTargetIsNode = e.relatedTarget == node.rscratch("svg"); // TODO plugin shouldn't use ele.rscratch
							
							if( newTargetIsHandle || newTargetIsNode || mdownOnHandle ){
								return; // don't consider mouseout
							}
							
//							console.log("removeHandler %o", e);
							
							node.unbind("mouseout", removeHandler);
							resetToDefaultState();
						}
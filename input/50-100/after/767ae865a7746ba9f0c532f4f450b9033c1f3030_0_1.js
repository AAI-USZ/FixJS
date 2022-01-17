function(xhr, textStatus, errorType) {
						textNode.nodeValue = "Model Run Failed!";
						createdLABEL.removeChild(progressIMG);
					
						$(createdLABEL).css({backgroundColor:'#fe0'});
					
						setTimeout(function() {
							numberOfRunsInProgress--;
						
							$(createdLI).remove();
							updateRunsListHeight();
						}, 5000);
					}
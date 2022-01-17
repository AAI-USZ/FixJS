function(){
						cy
							.off("mouseover", "node", startHandler)
							.off("mouseover", "node", hoverHandler)
							.off("mouseout", "node", leaveHandler)
							.off("grab", "node", grabNodeHandler)
							.off("free", "node", freeNodeHandler)
						;
						
						cy.unbind("zoom pan", transformHandler);
					}
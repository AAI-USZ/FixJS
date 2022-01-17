function(){
						cy.nodes()
							.die("mouseover", startHandler)
							.die("mouseover", hoverHandler)
							.die("mouseout", leaveHandler)
							.die("grab", grabNodeHandler)
							.die("free", freeNodeHandler)
						;
						
						cy.unbind("zoom pan", transformHandler);
					}
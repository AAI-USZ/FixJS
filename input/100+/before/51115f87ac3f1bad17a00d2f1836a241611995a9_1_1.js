function(i, target){
						switch( options().edgeType( source, target ) ){
						case "node":
							
							var p1 = source.position(false);
							var p2 = target.position(false);
							var p = {
								x: (p1.x + p2.x)/2,
								y: (p1.y + p2.y)/2
							};
												
							var interNode = cy.add($.extend( true, {
								group: "nodes",
								position: p
							}, options().nodeParams(source, target) )).addClass(classes);

							var source2inter = cy.add($.extend( true, {
								group: "edges",
								data: {
									source: source.id(),
									target: interNode.id()
								}
							}, options().edgeParams(source, target) )).addClass(classes);
							
							var inter2target = cy.add($.extend( true, {
								group: "edges",
								data: {
									source: interNode.id(),
									target: target.id()
								}
							}, options().edgeParams(source, target) )).addClass(classes);
							
							added = added.add( interNode ).add( source2inter ).add( inter2target );
							
							break;
						
						case "flat":
							var edge = cy.add($.extend( true, {
								group: "edges",
								data: {
									source: source.id(),
									target: target.id()
								}
							}, options().edgeParams(source, target) )).addClass(classes);
						
							added = added.add( edge );
						
							break;

						default:
							target.removeClass("ui-cytoscape-edgehandles-target");
							break; // don't add anything
						}
					}
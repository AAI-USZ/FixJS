function makeEdges( preview ){
					
					// console.log("make edges");
					
					var source = cy.nodes(".ui-cytoscape-edgehandles-source");
					var targets = cy.nodes(".ui-cytoscape-edgehandles-target");
					var classes = preview ? "ui-cytoscape-edgehandles-preview" : "";
					var added = cy.collection();
					
					if( source.size() == 0 || targets.size() == 0 ){
						return; // nothing to do :(
					}
					
					// just remove preview class if we already have the edges
					if( !preview && options().preview ){
						added = cy.elements(".ui-cytoscape-edgehandles-preview").removeClass("ui-cytoscape-edgehandles-preview");
						
						options().complete( source, targets, added );
						return;
					} else {
						// remove old previews
						cy.elements(".ui-cytoscape-edgehandles-preview").remove();
					}
					
					for( var i = 0; i < targets.length; i++ ){
						var target = targets[i];
						
						switch( options().edgeType( source, target ) ){
						case "node":
							
							var p1 = source.position();
							var p2 = target.position();
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
					
					if( !preview ){
						options().complete( source, targets, added );
					}
				}
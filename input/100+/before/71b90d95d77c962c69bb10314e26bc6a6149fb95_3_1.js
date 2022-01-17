function checkBusses(_ugen, gibberish) {
				//console.log("RUNNING INSIDE CODE FOR", _ugen.name );
				
				for(var j = 0; j < _ugen.senderObjects.length; j++) {
					var __ugen = _ugen.senderObjects[j];
					if(__ugen.category === "Bus") {
						//console.log("BUS SENDER OBJECT", ugen.name);
						checkBusses(__ugen, gibberish);
						if(__ugen.dirty)
							gibberish.generate(__ugen);
					 	gibberish.masterUpvalues.push( __ugen.upvalues + ";\n" );
						gibberish.masterCodeblock.push(__ugen.codeblock);					
						
						for(var k = 0; k < __ugen.fx.length; k++) {
							var fx = __ugen.fx[k];
							if(fx.dirty)
								gibberish.generate(fx);	
						}
					}else{
						if(__ugen.dirty) {
							//console.log(__ugen.name + " IS DIRTY");
						 	gibberish.generate(__ugen);
							__ugen.dirty = false;
						}
					 	gibberish.masterUpvalues.push( __ugen.upvalues + ";\n" );
						gibberish.masterCodeblock.push(__ugen.codeblock);					
						for(var k = 0; k < __ugen.fx.length; k++) {
							var fx = __ugen.fx[k];
							if(fx.dirty)
								gibberish.generate(fx);	
						}
					}
				}
			}
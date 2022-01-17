f			var debug = this.debug;
			this.masterUpvalues = [];
			this.masterCodeblock = [];
			this.memo = {};
			
			var start = "";//function(globals) {\n";
			var upvalues = "";
			var codeblock = "function cb() {\nvar output = 0;\n";
			
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
			
			for(var i = 0; i < this.ugens.length; i++) {
				var ugen = this.ugens[i];
				
				if(ugen.category === "Bus") {
					checkBusses(ugen, this);
					//console.log("BUS", ugen.name, ugen.codeblock);
				}
				var shouldPush = true;
				if(ugen.dirty) {
					this.generate(ugen);				
					ugen.dirty = false;
					shouldPush = false;
				}
				for(var k = 0; k < ugen.fx.length; k++) {
					var fx = ugen.fx[k];
					if(fx.dirty)
						this.generate(fx);	
				}	
				
				
				//this.masterUpvalues.push( ugen.upvalues + ";\n" );
				//if(shouldPush)
					this.masterCodeblock.push(ugen.codeblock);
				//console.log("MASTER UGEN CODEBLOCK", ugen.codeblock);
			}
			
			codeblock += this.masterCodeblock.join("\n");
			var end = "return output;\n}\nreturn cb;";
			
			var cbgen = start + this.masterUpvalues.join("") + codeblock + end;
	
			if(debug) console.log(cbgen);
			
			this.callbackString = cbgen;
			
			this.isDirty = false;
			
			return (new Function("globals", cbgen))(window);
		},

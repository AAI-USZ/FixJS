f			var debug = this.debug;
			this.masterUpvalues = [];
			this.masterCodeblock = [];
			this.memo = {};
			
			var start = "";//function(globals) {\n";
			var upvalues = "";
			var codeblock = "function cb() {\nvar output = 0;\n";
			
			for(var i = 0; i < this.ugens.length; i++) {
				var ugen = this.ugens[i];
				
				if(ugen.dirty) {
					Gibberish.generate(ugen);				
					ugen.dirty = false;
				}
				
				this.masterUpvalues.push( ugen.upvalues + ";\n" );
				this.masterCodeblock.push(ugen.codeblock);
			}
	
			codeblock += this.masterCodeblock.join("\n");
			var end = "return output;\n}\nreturn cb;";
			
			var cbgen = start + this.masterUpvalues.join("") + codeblock + end;
	
			if(debug) console.log(cbgen);
			
			this.callbackString = cbgen;
			
			this.isDirty = false;
			
			return (new Function("globals", cbgen))(window);
		},

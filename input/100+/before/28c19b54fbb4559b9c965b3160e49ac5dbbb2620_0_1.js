function compare(a, b, prefix, indent) {
		if(!prefix) prefix = "";
		if(!indent) indent = "";
		
		if(((typeof a === "object" && a !== null) || typeof a === "function")
				&& ((typeof b === "object" && b !== null) || typeof b === "function")) {
			var aIsArray = Object.prototype.toString.apply(a) === "[object Array]",
				bIsArray = Object.prototype.toString.apply(b) === "[object Array]";
			if(aIsArray === bIsArray) {
				var startBrace = (aIsArray ? "[" : "{"),
					endBrace = (aIsArray ? "]" : "}"),
					changes = "",
					haveKeys = false;
				
				for(var key in a) {
					if(!a.hasOwnProperty(key)) continue;
					
					haveKeys = true;
					var keyPrefix = aIsArray ? "" : JSON.stringify(key)+": ";
					if(b.hasOwnProperty(key)) {
						changes += compare(a[key], b[key], keyPrefix, indent+"  ");
					} else {
						changes += show(a[key], "- ", keyPrefix, indent+"  ");
					}
				}
				for(var key in b) {
					if(!b.hasOwnProperty(key)) continue;
					
					haveKeys = true;
					if(!a.hasOwnProperty(key)) {
						var keyPrefix = aIsArray ? "" : JSON.stringify(key)+": ";
						changes += show(b[key], "+ ", keyPrefix, indent+"  ");
					}
				}
				
				if(haveKeys) {
					return "  "+indent+prefix+startBrace+"\n"+
						changes+"  "+indent+(aIsArray ? "]" : "}")+"\n";
				}
				return "  "+indent+prefix+startBrace+endBrace+"\n";
			}
		}
		
		if(a === b) {
			return show(a, " ", prefix, indent);
		}		return show(a, "-", prefix, indent)+show(b, "+", prefix, indent);
	}

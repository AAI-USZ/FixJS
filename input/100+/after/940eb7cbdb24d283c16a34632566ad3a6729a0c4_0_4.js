function(node, add){
			var fn = add ? "addClass" : "removeClass";
			dojo[fn](node,"enabled");
			dojo[fn](node,"thumbClickable");
		}
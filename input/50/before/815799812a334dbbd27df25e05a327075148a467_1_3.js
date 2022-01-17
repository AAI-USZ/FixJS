function nodeShape(name){
		var ret = $.cytoscape("renderer", "svg", "nodeshape", name);
		
		if( ret == null ){
			$.error("SVG renderer does not recognise %s as a valid node shape", name);
		}
		
		return ret;
	}
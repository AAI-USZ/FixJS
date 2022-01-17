function lineStyle(name){
		var ret = $.cytoscape("renderer", "svg", "linestyle", name);
		
		if( ret == null ){
			$.error("SVG renderer does not recognise %s as a valid line style", name);
		}
		
		return ret;
	}
function SvgExporter(options){
		this.options = options;
		this.cy = options.cy;
		this.renderer = options.renderer;
		
		if( this.renderer.name() != "svg" ){
			$.error("The SVG exporter can be used only if the SVG renderer is used");
		}
	}
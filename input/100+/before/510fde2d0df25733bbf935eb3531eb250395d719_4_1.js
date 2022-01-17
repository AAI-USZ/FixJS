function(containerDiv, data, options, ctx) {	

  

	$(containerDiv).empty() ;	



	if ( options.thumbSize )	

		this.thumbSize = +options.thumbSize ;	

	if ( options.onClick )	

		this.onClick = options.onClick ;	

	if ( options.iconArrange )	

	{

		if ( options.iconArrange == "grid" ) this.mode = ThumbContainer.GRID_MODE ;

		else if ( options.iconArrange == "smart" ) this.mode = ThumbContainer.TRANS_MODE ;	

		else if ( options.iconArrange == "smart-grid" ) this.mode = ThumbContainer.TRANS_GRID_MODE ;

	}

	if ( options.thumbRenderer )

		this.thumbRenderer = options.thumbRenderer ;

		

	if ( options.tagManager )

		this.tagManager = options.tagManager ;

		

	if ( options.navMode )

		this.navMode = options.navMode ;

		

	this.containerDiv = containerDiv ;	



	this.ctx = ctx ;

		

	this.createCanvas() ;	



	this.thumbs = data ;	

	

}
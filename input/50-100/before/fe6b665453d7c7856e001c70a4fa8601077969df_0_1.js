function() {
		//Initialisation of ext JS template
		console.log(this.text );
		this.myTemplate = new Ext.XTemplate ( "<div>" + this.text +"</div>" ) ;
		//Compilation of template ( to accelerate the render )
		this.myTemplate.compile();
		this.HTML = ""; // contains the html
		this.callParent(arguments); // Initialization globale of the template
	}
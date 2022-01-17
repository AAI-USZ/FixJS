function ScrollbarRegion(params, contents)

{    

    ScrollbarRegion.baseConstructor.call(this, 0, 0);

    this.params = params;



    if (this.params.scrollbarWidth == null)

        this.params.scrollbarWidth = 10;



    if (this.params.scrollbarGap == null)

        this.params.scrollbarGap = 3;



    if (this.params.width == null)

        this.params.width = 100;



	if (this.params.height == null)

	    this.params.height = 100;



	// Initial scroll position

	this.scroll_x = 0; 

	this.scroll_y = 0;



	if (this.params.rectBorder != null)

	{

		// Put a border on the scrollbar region

		this.rectBorder = new SVGElement("rect", this.params.rectBorder);

		this.appendChild(this.rectBorder);

	}



    this.mask = new SVGRoot({width:params.width, height:params.height});

    this.contents = new SVGComponent(0, 0);

    this.contents.appendChild(contents);

    this.mask.appendChild(this.contents);

    this.appendChild(this.mask);



    // horizontal scrollbar

    this.hBar = new Scrollbar({orientation:"h", width:this.params.scrollbarWidth});

    this.appendChild(this.hBar);

    this.hBar.addActionListener(this);



    // vertical scrollbar

    this.vBar = new Scrollbar({orientation:"v", width:this.params.scrollbarWidth});

    this.appendChild(this.vBar);

    this.vBar.addActionListener(this);



    this.refreshLayout();

}
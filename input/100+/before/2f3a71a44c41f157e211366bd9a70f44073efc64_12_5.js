function Scrollbar(params)

{   

    this.params = params;

    if (!this.params)

       this.params = [];

       

    var direction;

    var backIcon;

    var fwdIcon;

    var width = 0;

    var height = 0;

    if (params.orientation == "h")

    {

       direction = "right";

       backIcon = new SVGElement("path", {d:"M0,0L0,20L-14,10z", fill:"blue"});

       fwdIcon = new SVGElement("path", {d:"M0,0L0,20L14,10z", fill:"blue"});

       height = params.width;

    }

    else

    {

       direction = "down";

       backIcon = new SVGElement("path", {d:"M0,0L20,0L10,-14z", fill:"blue"});

       fwdIcon = new SVGElement("path", {d:"M0,0L20,0L10,14z", fill:"blue"});

       width = params.width;

    }

    Scrollbar.baseConstructor.call(this, 0, 0, {direction:direction});



    this.backButton = new RectButton("backButton", 0, 0, backIcon, {fill:"white", stroke:"black", rx:2, width:params.width, height:params.width}, {fill:"blue"}, {fill:"blue"}, 4, false);

    this.backButton.addActionListener(this);

    this.appendChild(this.backButton);

   

    this.scrollbar = new SVGComponent(0, 0);

    this.scrollBg = new SVGElement("rect", {x:0, y:0, width:width, height:height, fill:"gray", stroke:"black"});

    this.scrollTop = new RectButton("scrollDragger", 0, 0, null, {fill:"white", stroke:"black", width:width, height:height}, {fill:"blue"}, {fill:"blue"}, 4, false);

    this.scrollTop.addActionListener(this);

   

    this.scrollbar.appendChild(this.scrollBg);

    this.scrollbar.appendChild(this.scrollTop);

    this.appendChild(this.scrollbar);

   

    this.fwdButton = new RectButton("fwdButton", 0, 0, fwdIcon, {fill:"white", stroke:"black", rx:2, width:params.width, height:params.width}, {fill:"blue"}, {fill:"blue"}, 4, false);

    this.fwdButton.addActionListener(this);

    this.appendChild(this.fwdButton);

    

    this.position = 0; // The position of the top of the dragbar

    this.scrollbarLength = 0; // The length of the scrollbar background

    this.dragbarLength = 0; // The length of the dragbar

}
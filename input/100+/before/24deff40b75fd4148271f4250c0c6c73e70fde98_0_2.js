function(theCanvas)
{
    this.canvas = theCanvas;
    this.canvas.focus();
    this.defaultdisplay = true;
    this.mousePosition = new SinglePoint(0, 0);
    this.startNode = new Node(0,0,0,0,0,0);
    
    this.zoomdelta = 0;
    this.currentwidth=200;
    this.currentheight=100;
    
    this.draghelper=false;
    
    this.current='reference';
    
	this.references = [];
	this.connections = [];
	this.context = this.canvas.getContext("2d");
	this.settings = { background: "#fff", connection: "#000", selection: "#000", node: "#31456b", nodeBorder: "#fff", nodeHoverBorder: "#000", nodeHover: "#0c0" };
  
  
  	this.mouseDownHandler = this.mouseDown.bind(this);
	this.mouseUpHandler = this.mouseUp.bind(this);
	this.mouseMoveHandler = this.mouseMove.bind(this);
	
	this.touchStartHandler = this.touchStart.bind(this);
	this.touchEndHandler = this.touchEnd.bind(this);
	this.touchMoveHandler = this.touchMove.bind(this);
	
	this.keyHandler = this.key.bind(this);
	
	this.mousewheelHandler = this.mousewheel.bind(this);

	this.canvas.addEventListener("mousedown", this.mouseDownHandler, false);
	this.canvas.addEventListener("mouseup", this.mouseUpHandler, false);
	this.canvas.addEventListener("mousemove", this.mouseMoveHandler, false);
	
	this.canvas.addEventListener("touchstart", this.touchStartHandler, false);
	this.canvas.addEventListener("touchend", this.touchEndHandler, false);
	this.canvas.addEventListener("touchmove", this.touchMoveHandler, false);
	
	this.canvas.addEventListener("keydown", this.keyHandler, false);
	
	this.canvas.addEventListener("DOMMouseScroll",this.mousewheelHandler,false);
	this.canvas.addEventListener("mousewheel",this.mousewheelHandler,false);

}
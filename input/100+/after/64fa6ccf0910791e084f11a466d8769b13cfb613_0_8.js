function(canvas, w, h) { 
        var pc = canvas;
        if (zebra.isString(canvas)) canvas = document.getElementById(canvas);
        
        if (canvas == null || typeof canvas === "undefined") {
            canvas = document.createElement("canvas");
            canvas.setAttribute("tabindex", "0");
            canvas.setAttribute("class", "zebracanvas");
            canvas.setAttribute("width",  w <= 0 ? "400" : "" + w);
            canvas.setAttribute("height", h <= 0 ? "400" : "" + h);
            canvas.setAttribute("id", pc);
            document.body.appendChild(canvas); 
        }
    
        this.getContext = function(){  return this.graph; }
    
        this.getComponentAt = function(x,y){
            for(var i = this.kids.length; --i >= 0; ){
                var tl = this.kids[i];            
                if (tl.isLayerActiveAt(x, y)) return EM.getEventDestination(tl.getComponentAt(x, y));
            }
            return null;
        }
        this.$super();

        this.da = new zebra.util.Rectangle(0, 0, -1, 0);
        this.width  = parseInt(canvas.width);
        this.height = parseInt(canvas.height);
        this.offx = this.offy = 0;
        this.graph = createContext(canvas.getContext("2d"), this.width, this.height);

        var e = canvas;
        if (e.offsetParent) {
        	do {
    			this.offx += parseInt(e.offsetLeft);
    			this.offy += parseInt(e.offsetTop);
    		} while (e = e.offsetParent);
        }
        
		this.timer = this.keyPressed = this.moveOwner = this.pressOwner = this.draggOwner = null;
		this.pressX = this.pressY = this.mousePressedMask = 0;
        this.canvas = canvas;
        this.doubleClickDelta = 100;

        //!!!
    	EM = pkg.events;
        this.setBackground(null);
        
        var layers = pkg.get("layers"); 
        for(var i=0; i < layers.length; i++) this.add(pkg.get(layers[i]));   

        var $this = this;
        this.canvas.onmousemove = function() { mouseMoved.apply($this, arguments);   }
        this.canvas.onmousedown = function() { mousePressed.apply($this, arguments); }
        this.canvas.onmouseup   = function() { mouseReleased.apply($this, arguments);}
        this.canvas.onmouseover = function() { mouseEntered.apply($this, arguments); }
        this.canvas.onmouseout  = function() { mouseExited.apply($this, arguments);  }
        this.canvas.onkeydown   = function() { keyPressed.apply($this, arguments);  }
        this.canvas.onkeyup     = function() { keyReleased.apply($this, arguments);  }
        this.canvas.onkeypress  = function() { keyTyped.apply($this, arguments);  }
        this.canvas.oncontextmenu = function(e) { if (!e) e = window.event; e.preventDefault(); }
        this.canvas.onmove        = function(e) { setupMeF(); }
        
        if (zebra.isInBrowser) {
            window.onresize = function() { setupMeF(); }
        }

        this.setLayout(new zebra.layout.Layout([
            function calcPreferredSize(c) { return new Dimension(parseInt(c.canvas.width), parseInt(c.canvas.height)); },
            function doLayout(c){
                var x = c.getLeft(), y = c.getTop(), w = c.width - c.getRight() - x, h = c.height - c.getBottom() - y;
                for(var i = 0;i < c.kids.length; i++){
                    var l = c.kids[i];
                    if(l.isVisible){
                        l.setLocation(x, y);
                        l.setSize(w, h);
                    }
                }
            }
        ]));

        //!!!
        new pkg.MWheelSupport(this);
        this.validate();
        
        //!!!
        setupMeF();
    }
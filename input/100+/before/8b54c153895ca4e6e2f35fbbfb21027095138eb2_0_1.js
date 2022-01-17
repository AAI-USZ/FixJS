function($canvas, cid)
	{
		var self = this;
		this._$canvas = $canvas;
		$c = $canvas;
		this._cid = cid;
		$(window).resize(function() {self._calcSize(); stage.update();});
		
		this._child = new Container();
		this._tname = new Text('', FONT.LG, COL.BLACK);
		this._tlen = new Text('', FONT.M, COL.BLACK);
		this._tname.textAlign = 'center';
		this._tname.maxWidth = 1000;
		this._tlen.textAlign = 'center';
		this._tlen.maxWidth = 1000;
		
		this._fc = new FragmentContainer(this);
$(window).keypress(function() {self._fc.debug();});
		
		this._server = new Server();
		
		this._child.addChild(this._tname, this._tlen, this._fc);
		this.addChild(this._child, this._server);
		
		this._calcSize();
		
		this.setName('My Name (' + this._cid + ')');
		this.setLength(150);
		
		//setup the canvas
		stage = new Stage(document.getElementById('cdesigner')); //$canvas.get());
		stage.addChild(this);
		stage.enableMouseOver(15);
		
		var self = this;
		self._server.getInfo(self._cid, function(c) {self._gotInfo(c)});
		
		self._initInfo();
		
		stage.update();

        //listen for items being dragged into the canvas
		var o = this._$canvas.parent().offset();
        $canvas.droppable({
            accept: '.jFragment',
            over: function(event, ui) {
                var jf = ui.draggable;
                jf.on('drag', function(event, ui) {
                    var p = self._fc.globalToLocal( event.pageX - o.left, 
                                                   event.pageY - o.top);
                    if( (p.x*p.x + p.y*p.y) < F.joinRadius * F.joinRadius )
                    {
                        //try and avoid being clobbered by high speed
                        //mice
                        jf.off('drag');
                        if(jf.data('cf'))
                        {
                            jf.off('dragstop');
                            jf.on('dragstop', function(ev,ui){
                                jf.remove(); //remove from the DOM
                                //but don't tell the server anything
                            });
                        }
                        self.join(jf);
                        //stop ui.mouse from getting confused...
                        $(document).mouseup();
                        return false; //triggers 'stop'
                    }
                    return true;
                });
            },
        });

	}
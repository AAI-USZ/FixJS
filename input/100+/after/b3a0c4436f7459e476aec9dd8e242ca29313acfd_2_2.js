function Text(params){
		/*{
			parent: the parent element where this should be displayed
			wrapper: a function that produces a styled wrapper element
			processor: a text pre-processor, for adding annotations and stuff
			menu: the highlight menu associated with this text
			text: initial content,
		}*/
		var raw, d_el, c_el,
			processor = (typeof params.processor === 'function')
				?params.processor
				:function(x){
					var el = document.createElement("span");
					el.innerHTML = x;
					return el.childNodes.length===1?el.firstChild:el;
				};
		
		this.displayed = false;
		this.menu = new TextMenu(params.menu);
		this.parent = params.parent || document.body;
		if(!(this.parent instanceof HTMLElement)){throw "Invalid Parent Node";}
		
		c_el = document.createElement('span');
		c_el.innerHTML = "loading...";
		
		d_el = (typeof params.wrapper == 'function')?params.wrapper(c_el):c_el;
		d_el.addEventListener("mouseup",textMouseup.bind(this),false);
		
		Object.defineProperties(this,{
			text: {
				set: (c_el === d_el)?
					function(t){
						d_el.replaceChild(processor(t),d_el.firstChild);
						return raw = t;
					}:
					function(t){
						var nn = processor(t);
						c_el.parentNode.replaceChild(nn,c_el);
						c_el = nn;
						this.contentElement = c_el;
						return raw = t;
					},
				get: function(){return raw;},
				enumerable: true
			},
			lineBoxHeight: {
				//TODO: this should be sensitive to orientation
				get: function(){
					if(!this.displayed){return 0;}
					var cs = c_el.parentNode.getClientRects();
					return cs.length?cs[0].bottom-cs[0].top:c_el.parentNode.clientHeight;
				}
			}
		});
		
		this.displayElement = d_el;
		this.contentElement = c_el;
		if(params.text){this.text = params.text;}
	}
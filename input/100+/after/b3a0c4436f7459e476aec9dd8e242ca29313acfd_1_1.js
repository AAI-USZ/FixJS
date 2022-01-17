function(Ayamel){
	"use strict";
	if(!Ayamel){
		throw new Error("Ayamel Uninitialized");
	}
	
	function caption_menu(){
		var selection;
		return {
			element: document.createElement('span'),
			set selection(s){
				selection = s;
				this.element.innerText = s.toString();
			},
			get selection(){return selection;}
		};
	}
	
	function Caption(params){
		if(params.cue instanceof Cue){
			this.text = new Ayamel.Text({
				wrapper:params.wrapper,
				menu:caption_menu(),
				processor:params.processor,
				text:params.cue.text
			});
			this.cue = params.cue;
		}else{
			this.text = new Ayamel.Text(params);
			this.cue = new Cue("",params.startTime,params.endTime,params.text);
		}
	};
	
	Object.defineProperties(Caption.prototype,{
		start: { get: function(){ return this.cue.startTime; }, enumerable: true },
		stop: { get: function(){ return this.cue.endTime; }, enumerable: true },
		el: { get: function(){ return this.text.displayElement; }, enumerable: true },
		displayed: { get: function(){ return this.text.displayed; }, enumerable: true }
	});
	
	Caption.prototype.display = function(target){
		var text = this.text,
			el = text.displayElement,
			style = el.style,
			cue = this.cue,
			position = cue.position,
			direction = Ayamel.Text.getDirection(cue.text),
			size, indent,
			pos,lh;
		
		if(!target){ target = text.parent; }
		
		text.hide();
		text.text = cue.text;
		style.position = 'absolute';
		
		/*
		A WebVTT vertical text cue setting configures the defines the ordering of lines, not the direction of symbols.
		*/
		
		//Determine the size & position based on alignment & direction
		switch(cue.align){
			case 'start':
				style.textAlign = direction === 'ltr'?'left':'right';
				size = Math.min(cue.size,100-position);
				indent = position;
				break;
			case 'end':
				style.textAlign = direction === 'rtl'?'left':'right';
				size = Math.min(cue.size,position);
				indent = position-size;
				break;
			case 'middle':
				style.textAlign = 'center';
				size = Math.min(cue.size,2*(position>50?100-position:position));
				indent = position-size/2;
				break;
			default:
				throw "Invalid Alignment Value";
		}
		
		//Determine the writing direction and assign size & position
		style.top = "";
		style.bottom = "";
		style.left = "";
		style.right = "";
		if(cue.vertical === ''){
			style.writingMode = "horizontal-tb";
			style.height = "auto";
			style.width = size+"%";
			style[direction==='ltr'?'left':'right'] = indent+"%";
			
			if(cue.rawLine === 'auto'){
				style.bottom = 0;
				text.display(target);
			}else{
				text.display(target);
				if(cue.snapToLines){
					lh = text.lineBoxHeight;
					pos = cue.rawLine*lh;
					if(pos < 0){ style.bottom = (-pos-lh)+"px"; }
					else{ style.top = pos+"px"; }
				}else{
					style.top = cue.rawLine*(target.clientHeight-el.clientHeight)/100+"px";
				}
			}			
		}else{
			throw new Error("Vertical Text Not Supported");
			/*
			style.height = size+"%";
			style.width = "auto";
			style.top = indent+"%";
			switch(cue.vertical){
				case 'rl':
					style.writingMode = "tb-rl";
					style.webkitWritingMode = "vertical-rl";
					start = 'right'
					bottom = 'left';
					break;
				case 'lr':
					style.writingMode = "tb-lr";
					style.webkitWritingMode = "vertical-lr";
					start = 'left';
					end = 'right';
					break;
				default:
					throw "Invalid Writing Direction";
			}
			*/
		}
	};
	
	Caption.prototype.hide = function(){ this.text.hide(); };
	
	Caption.FromCue = function(wrapper,processor,cue){
		return new Caption({
			wrapper:wrapper,
			menu:caption_menu(),
			processor:processor,
			cue:cue
		});
	};

	Caption.Track = function(clist, smode, stime){
		var mode, match,
			time = +stime||0,
			captions = clist||[],
			active = [],
			hidden = [];
		
		match = /showing|disabled|hidden/.exec(""+smode);
		mode = match?match[0]:'showing';
		
		captions.forEach(function(c){
			if(c.start <= time && time <= c.stop){
				active.push(c);
			}else{ hidden.push(c); }
		});
				
		Object.defineProperties(this,{
			captions: {get: function(){return cues;}},
			activeCaptions: {get: function(){return active;}},
			mode: {
				set: function(val){
					val = ""+val;
					if(mode !== val){
						switch(mode){
							case 'showing':
								active.forEach(function(c){c.display(this.target);});
								break;
							case 'disabled':
							case 'hidden':
								active.forEach(function(c){c.hide();});
							default:
								return mode;
						}
						mode = val;
					}
					return mode;
				},
				get: function(){return mode;}
			},
			time: {
				set: function(t){
					time = +t;
					var i, c, newhidden = [];
					for(i=0;c = active[i];){
						if(c.stop < time || time < c.start){
							c.hide();
							newhidden.push(active.splice(i,1)[0]);
						}else{i++;}
					}
					if(mode === 'showing'){
						for(i=0;c = hidden[i];){
							if(c.start <= time && time <= c.stop){
								c.display(this.target);
								active.push(hidden.splice(i,1)[0]);
							}else{i++;}
						}
					}else{
						for(i=0;c = hidden[i];){
							if(c.start <= time && time <= c.stop){
								active.push(hidden.splice(i,1)[0]);
							}else{i++;}
						}
					}
					hidden.push.apply(hidden,newhidden);
				},
				get: function(){return time;}
			}
		});
		this.target = null;
		this.addCaption = function(cap){
			captions.push(cap);
			if(cap.start <= time && cap.stop >= time){
				active.push(cap);
				if(mode === 'showing'){cap.display(this.target);}
			}else{ hidden.push(cap); }
		};
	};
	
	Caption.Track.FromCues = function(wrapper, processor, clist, smode, stime){
		return new Caption.Track(clist.map(Caption.FromCue.bind(null,wrapper,processor)),smode,stime);
	};
	
	Ayamel.Caption = Caption;
}
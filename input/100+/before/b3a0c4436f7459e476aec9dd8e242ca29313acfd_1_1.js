function(cue){
		var style = this.el.style,
			self = this,
			size,l,alr,
			indent,
			direction,
			position = cue.position;
			
		style.position = 'absolute';
		this.start = cue.startTime;
		this.stop = cue.endTime;
		this.id = cue.id;
		this.text = cue.text;
		
		direction = Ayamel.Text.getDirection(cue.text);
		
		/*
		A WebVTT vertical text cue setting configures the defines the ordering of lines, not the direction of symbols.
		*/
		
		//Determine the maximum possible size based on alignment
		switch(cue.align){
			case 'start':
				style.textAlign = 'left';
				size = (cue.vertical !== '' || direction !== 'rtl')?100-position:position;
				break;
			case 'end':
				style.textAlign = 'right';
				size = (cue.vertical !== '' || direction !== 'rtl')?position:100-position;
				break;
			case 'middle':
				style.textAlign = 'center';
				size = 2*(position>50?100-position:position);
				break;
			default:
				throw "Invalid Alignment Value";
		}
		if(cue.size<size){size=cue.size;}
		
		//Determine the writing direction and actual size and position
		style.width = "auto";
		style.height = "auto";
		style.top = "";
		style.bottom = "";
		style.left = "";
		style.right = "";
		style.lineHeight = 1;
		if(cue.vertical === ''){
			style.writingMode = "horizontal-tb";
			lineOffset('top','bottom');
			style.width = size+"%";
			switch(cue.align){
				case 'start': indent = direction==='ltr'?position:(100-position-size);
					break;
				case 'end': indent = direction==='ltr'?(position-size):(100-position);
					break;
				default: indent = (direction==='ltr'?position:100-position)-size/2;
			}
			style.left = indent+"%";
		}else{
			switch(cue.vertical){
				case 'rl':
					style.writingMode = "tb-rl";
					style.webkitWritingMode = "vertical-rl";
					lineOffset('right','left');
					break;
				case 'lr':
					style.writingMode = "tb-lr";
					style.webkitWritingMode = "vertical-lr";
					lineOffset('left','right');
					break;
				default:
					throw "Invalid Writing Direction";
			}
			style.height = size+"%";
			switch(cue.align){
				case 'start': indent = position;
					break;
				case 'end': indent = position-size;
					break;
				default: indent = position-size/2;
			}
			style.top = indent+"%";
		}
		
		function lineOffset(top,bottom){
			var pos,unit,lh;
			if(cue.rawLine === 'auto'){
				style[bottom] = 0;
			}else{
				if(cue.snapToLines){
					lh = parseInt(getComputedStyle(self.el).lineHeight,10);
					pos = cue.rawLine*lh;
					if(pos < 0){ style[bottom] = (-pos-lh)+"px"; }
					else{ style[top] = pos+"px"; }
				}else{
					style[top] = cue.rawLine+"%";
				}
			}
		}
	}
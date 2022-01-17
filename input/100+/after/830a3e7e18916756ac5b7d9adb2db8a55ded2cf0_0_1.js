function() {
		// clean the updateTask to allow a new one
		// important to do it first because iOS with its
		// bad thread system can trigger code that will ask for an
		// update without having finish this code
		this.updateTask = undefined;

//		window.scrollTo(0, 0);

		// update measure
//		var innerWidth = window.innerWidth;
//		var innerHeight = window.innerHeight;

		var innerWidth = document.body.clientWidth;
		var innerHeight = document.body.clientHeight;



//		console.log('window.update('+innerWidth+' x '+innerHeight+') '+document.body.clientWidth+' x '+document.body.clientHeight+' '+window.title+', iframe ? '+(window.parent != window));

		// check if were are an iframe. Get the size from our parent if possible
		if(window.parent != window) {
			try {
				var frames = window.parent.document.getElementsByTagName("IFRAME");
				for(var i = 0; i < frames.length; i++) {
					if(frames[i].contentWindow === window) {
						innerWidth = new Number(frames[i].style.width.replace(/px$/, ''));
						innerHeight = new Number(frames[i].style.height.replace(/px$/, ''));
						break;
					}
				}
			} catch(e) {}
		}

		var size;
		if(this.autoscale) {
			// if window size changed, try to find a new scale
			if((this.windowWidth != innerWidth) || (this.windowHeight != innerHeight)) {
				var size = this.measure(innerWidth, innerHeight);
				if(size.width < innerWidth)
					size.width = innerWidth;
				if(size.height < innerHeight)
					size.height = innerHeight;
				this.windowScale = 1;
				if((size.width > innerWidth) || (size.height > innerHeight))
					this.windowScale = Math.max(size.width / innerWidth, size.height / innerHeight);
				size = this.measure(innerWidth * this.windowScale, innerHeight * this.windowScale);
				this.setTransform(Ui.Matrix.createScale(1/this.windowScale));
			}
			// try old scale
			else {
				size = this.measure(innerWidth * this.windowScale, innerHeight * this.windowScale);
				if((size.width > innerWidth * this.windowScale) || (size.height > innerHeight * this.windowScale)) {
					if(size.width < innerWidth)
						size.width = innerWidth;
					if(size.height < innerHeight)
						size.height = innerHeight;
					this.windowScale = 1;
					if((size.width > innerWidth) || (size.height > innerHeight))
						this.windowScale = Math.max(size.width / innerWidth, size.height / innerHeight);
					size = this.measure(innerWidth * this.windowScale, innerHeight * this.windowScale);
					this.setTransform(Ui.Matrix.createScale(1/scale));
				}
			}
		}
		else {
			this.windowScale = 1;
			size = this.measure(innerWidth, innerHeight);
		}
		this.windowWidth = innerWidth;
		this.windowHeight = innerHeight;

//		console.log(this+'.update size: '+this.windowWidth+' x '+this.windowHeight+', child: '+size.width+' x '+size.height);

		this.arrange(0, 0, Math.max(this.windowWidth * this.windowScale, size.width), Math.max(this.windowHeight * this.windowScale, size.height));

		// update arrange
//		while(this.layoutList != undefined) {
//			var next = this.layoutList.layoutNext;
//			this.layoutList.layoutValid = true;
//			this.layoutList.layoutNext = undefined;
//			this.layoutList.updateLayout();
//			this.layoutList = next;
//		}

//		console.log(this+'.update end ('+(new Date()).getTime()+')');

//		if(navigator.iPad || navigator.iPhone) {
//			var top = document.body.scrollTop;
//			document.body.scrollLeft = 0;
//			document.body.scrollTop = 0;
//			document.body.scrollTop = top;
//		}
	}
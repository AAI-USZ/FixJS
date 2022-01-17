function(data, index, callback){
		// summary:
		//		Loads an image.

		var store = this.imageStore;
		var url = store.getValue(data,this.imageThumbAttr);
		
		var imgContainer = dojo.create("div", {
			id: "img_" + this.widgetid + "_" + index
		});
		var img = dojo.create("img", {}, imgContainer);
		img._index = index;
		img._data = data;
	
		this._thumbs[index] = imgContainer;
		var loadingDiv;
		if(this.useLoadNotifier){
			loadingDiv = dojo.create("div", {
				id: "loadingDiv_" + this.widgetid+"_" + index
			}, imgContainer);
	
			//If this widget was previously told that the main image for this
			//thumb has been loaded, make the loading indicator transparent.
			this._setThumbClass(loadingDiv,
				this._loadedImages[index] ? "thumbLoaded":"thumbNotifier");
		}
		var size = dojo.marginBox(this.thumbsNode);
		var defaultSize;
		var sizeParam;
		if(this.isHorizontal){
			defaultSize = this.thumbWidth;
			sizeParam = 'w';
		} else{
			defaultSize = this.thumbHeight;
			sizeParam = 'h';
		}
		size = size[sizeParam];
		var sl = this.thumbScroller.scrollLeft, st = this.thumbScroller.scrollTop;

		dojo.style(this.thumbsNode, this._sizeProperty, (size + defaultSize + 20) + "px");

		//Remember the scroll values, as changing the size can alter them
		this.thumbScroller.scrollLeft = sl;
		this.thumbScroller.scrollTop = st;
		this.thumbsNode.appendChild(imgContainer);
	
		dojo.connect(img, "onload", this, dojo.hitch(this, function(){
			if(store != this.imageStore){
				// If the store has changed, ignore this load event
				return false;
			}
			this.resize();
						
			// Have to use a timeout here to prevent a call stack that gets
			// so deep that IE throws stack overflow errors
			setTimeout(callback, 0);
			return false;
		}));
	
		dojo.connect(img, "onclick", this, function(evt){
			dojo.publish(this.getClickTopicName(),	[{
				index: evt.target._index,
				data: evt.target._data,
				url: img.getAttribute("src"),
				largeUrl: this.imageStore.getValue(data,this.imageLargeAttr),
				title: this.imageStore.getValue(data,this.titleAttr),
				link: this.imageStore.getValue(data,this.linkAttr)
			}]);
			return false;
		});
		dojo.addClass(img, "imageGalleryThumb");
		img.setAttribute("src", url);
		var title = this.imageStore.getValue(data, this.titleAttr);
		if(title){ img.setAttribute("title",title); }
		this._updateNavControls();
	
	}
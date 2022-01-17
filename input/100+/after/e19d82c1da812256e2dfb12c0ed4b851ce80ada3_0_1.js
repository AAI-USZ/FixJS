function() {
        if(this.currentPage <= 0) {
            this.$.backb.setDisabled(true);
        } else {
            this.$.backb.setDisabled(false);
        }
        if(this.currentPage+1 >= this.pages.length) {
            this.$.forb.setDisabled(true);
        } else {
            this.$.forb.setDisabled(false);
        }
            
        //this.$.scroller.setScrollTop(0);
	if (this.pages[this.currentPage]){

        var file = this.pages[this.currentPage].src;
	this.base = this.pages[this.currentPage].src.slice(0, this.pages[this.currentPage].src.indexOf("/", 8)+1);
	 if (this.base == "") {
                this.base = file + "/";
            }
	this.$.scrim2.showAtZIndex(10);	
	new enyo.Ajax({
            url: ""+file, 
		    handleAs: "text"})
			.response(this, function(inSender, inValue){
		var i=0;
		this.$.scrim2.hideAtZIndex(10);
		var str = inValue.replace(/href=\"\//g, 'href="'+ this.base);   //update on site links with base uri
		str = str.replace(/src=\"\//g, 'src="' + this.base);
                this.$.content.setContent(str);
                this.$.content.render();
                this.processChapter();                
			})
			.error(this, function(inSender, inValue) {
				console.log("error " + inValue);
				this.$.scrim2.hideAtZIndex(10);
			})
			.go();
    }
	}
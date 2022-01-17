function() {
		this.Container.removeClass("focused");
		this.Element.unbind("keydown");
		this.Open = false;
		this.Container.removeClass("open");
		this.Container.find("datalist").hide();
		$("body").unbind("click",this.BoundWindowClick);
	}
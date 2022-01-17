function(markdownViewContent){
			return "<section class='span6'>" + this._mdConverter.makeHtml(markdownViewContent); + "</section>";
		}
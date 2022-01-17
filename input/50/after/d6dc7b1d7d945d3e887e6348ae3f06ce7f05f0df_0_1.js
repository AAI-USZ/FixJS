function(markdownViewContent){
			return "<section class='span8 pages-content'>" + this._mdConverter.makeHtml(markdownViewContent); + "</section>";
		}
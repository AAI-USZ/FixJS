function()
	{
		html =
		
		"<div id='zeega-player'>";
			//"<div id='preview-logo' class='player-overlay'><a href='http://www.zeega.org/' target='blank'><img src='"+sessionStorage.getItem('hostname') + sessionStorage.getItem('directory') +"images/z-logo-128.png'height='60px'/></a></div>";
		
		if(this.zeega) html +=
			"<div id='preview-close' class='player-overlay'><a class='close' href='#' style='opacity:.75'>&times;</a></div>";
		
		
		html +=
		
			"<div id='preview-left' class='hidden preview-nav-arrow preview-nav'>"+
				"<div class='arrow-background'></div>"+
				"<img class='player-arrow arrow-left' src='"+ sessionStorage.getItem('hostname') + sessionStorage.getItem('directory')+'images/mediaPlayerArrow_shadow.png' +"'>"+
			"</div>"+
			"<div id='preview-right' class='hidden preview-nav-arrow preview-nav'>"+
				"<div class='arrow-background'></div>"+
				"<img class='player-arrow arrow-right' src='"+ sessionStorage.getItem('hostname') + sessionStorage.getItem('directory')+'images/mediaPlayerArrow_shadow.png' +"'>"+
			"</div>"+
			"<div id='preview-media'></div>"+
				"<div id='citation' class='player-overlay'><ul class='citation-list unstyled'></ul></div>";
		
		return html;
	}
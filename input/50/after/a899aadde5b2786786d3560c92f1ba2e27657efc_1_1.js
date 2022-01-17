function() {

	this.attachjPlayer($("#jPlayer"), $("div.toolbar ul.player"), $("#Playlist"));

	this.attachDomEvents();
	this.fadeInContent();
	this.attachBubble();

	//$.firefly();

	//this.runHash();
	// Do we want to check for hash changes?
	//window.onhashchange = $.proxy(this.runHash, this);

}
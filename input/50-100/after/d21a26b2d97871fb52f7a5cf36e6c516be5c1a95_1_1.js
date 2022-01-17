function() {
	this.main = $('<div style="height:'+this.height+'px;overflow:auto;border:1px solid #ccc;"></div>');
	this.main.attr("id", this.id);	
	this.scrollable = $('<div class="scrollable-area"></div>').appendTo(this.main);
	this.contentArea = $('<table id="' + this.contentId + '"></table>').appendTo(this.scrollable);
}